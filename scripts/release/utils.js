require('isomorphic-fetch')
const spawnSync = require('child_process').spawnSync
const path = require('path')

const removeUnuseChar = value => {
  if (!value) {
    return ''
  }
  return value.replace(/(\r\n\t|\n|\r\t)/gm, '')
}

const runCommand = (cmd, args) => {
  const resultObj = spawnSync(cmd, args)
  const { stdout, stderr } = resultObj

  if (stderr.length !== 0) {
    console.error(stderr.toString().trim())
    return stderr.toString().trim()
  }
  console.info(stdout.toString().trim())
  return stdout.toString().trim()
}

const getRef = () => {
  return runCommand('git', ['rev-parse', '--short', 'HEAD'])
}

const getVersionTag = () => {
  // This one use in case release dev we not create the tag
  const packageFolderName = path.basename(path.dirname(`${process.cwd()}/package.json`))
  try {
    const tagName = process.env.RELEASE_VERSION
    const tagNameArr = removeUnuseChar(tagName).split('_')
    const PACKAGE_NAME_INDEX = 0
    const VERSION_INDEX = 1
    const packageName = tagNameArr[PACKAGE_NAME_INDEX] || packageFolderName
    const version = tagNameArr[VERSION_INDEX] || getRef()
    return { packageName, version }
  } catch (error) {
    console.error(error)
    return { packageName: packageFolderName, version: getRef() }
  }
}

const sendMessageToSlack = async message => {
  console.info(message)
  try {
    const slackHook = process.env.RELEASE_SLACK_WEB_HOOK_URL
    const result = await fetch(slackHook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: message,
      }),
    })
    console.log('sendMessageToSlack', result.statusText)
    return result
  } catch (err) {
    console.error(err)
    throw new Error(err)
  }
}

const extractTarFile = async ({ tagName, packageName }) => {
  try {
    const fileName = `${tagName}.tar.gz`
    runCommand('tar', [
      '-C',
      `./packages/${packageName}/public`,
      '-xzvf',
      `./packages/${packageName}/public/${fileName}`,
    ])
  } catch (err) {
    console.error('releaseWebApp', err)
    throw new Error(err)
  }
}

const copyConfig = ({ packageName }) => {
  const destinationFolder = `${process.cwd()}/packages/${packageName}/public/dist`
  const configFilePath = `${process.cwd()}/packages/${packageName}/config.json`
  runCommand('cp', [configFilePath, destinationFolder])
}

const runReleaseCommand = async ({ packageName, tagName, env }) => {
  await sendMessageToSlack(`Deploying for web app \`${packageName}\` with version \`${tagName}\``)
  runCommand('yarn', ['workspace', packageName, `release:${env}`])
  await sendMessageToSlack(`Finish the deployment for web app \`${packageName}\` with version \`${tagName}\``)
}

const runTestCypress = async ({ packageName, tagName, env }) => {
  await sendMessageToSlack(`Testing cypress for web app \`${packageName}\` with version \`${tagName}\``)
  runCommand('yarn', [
    'workspace',
    'cloud-alert',
    'cypress:ci',
    '--env',
    `ENVIRONMENT=${env},PACKAGE_NAME=${packageName}`,
  ])
  await sendMessageToSlack(`Finish testing cypress for web app \`${packageName}\` with version \`${tagName}\``)
}

const releaseWebApp = async ({ tagName, packageName, env }) => {
  try {
    await extractTarFile({ tagName, packageName })
    // Ignore copy config for web-components
    if (packageName === 'web-components') {
      packageName = '@reapit/web-components'
      await runReleaseCommand({ packageName, tagName, env })
      await runTestCypress({ packageName, tagName, env })
      return
    }
    await copyConfig({ packageName })
    await runReleaseCommand({ packageName, tagName, env })
    await runTestCypress({ packageName, tagName, env })
  } catch (err) {
    console.error('releaseWebApp', err)
    throw new Error(err)
  }
}

const runReleaseCommandForWebComponents = async ({ packageName, tagName, env }) => {
  await sendMessageToSlack(`Deploying for web app \`${packageName}\` with version \`${tagName}\``)
  runCommand('yarn', ['workspace', '@reapit/web-components', `release:serverless:${env}`, '--name', packageName])
  await sendMessageToSlack(`Finish the deployment for web app \`${packageName}\` with version \`${tagName}\``)
}

const releaseServerless = async ({ tagName, packageName, env }) => {
  // This is temporary fix for deployment to new prod and old prod env
  if (env === 'staging') {
    env = 'production'
  }
  try {
    await sendMessageToSlack(`Checking out for \`${packageName}\` with version \`${tagName}\``)
    runCommand('git', ['checkout', tagName])
    const isReleaseWebComponentPackage = WEB_COMPONENTS_SERVERLESS_APPS.includes(packageName)
    if (isReleaseWebComponentPackage) {
      await runReleaseCommandForWebComponents({ packageName: packageName, tagName, env })
      await runTestCypress({ packageName, tagName, env })
      return
    }
    await runReleaseCommand({ packageName, tagName, env })
    await runTestCypress({ packageName, tagName, env })
    return
  } catch (err) {
    console.error('releaseServerless', err)
    throw new Error(err)
  }
}

const releaseNpm = async ({ tagName, packageName }) => {
  try {
    await sendMessageToSlack(`Checking out for \`${packageName}\` with version \`${tagName}\``)
    runCommand('git', ['checkout', tagName])
    await sendMessageToSlack(`Releasing for npm \`${packageName}\` with version \`${tagName}\``)
    runCommand('git', ['config', '--global', 'url.ssh://git@github.com/.insteadOf https://github.com/'])
    runCommand('git', ['config', '--global', 'user.email', `"${process.env.GITHUB_ACTOR}@email.com"`]).toString()
    runCommand('git', ['config', ' --global', 'user.name', `"${process.env.GITHUB_ACTOR}"`])
    runCommand('yarn', ['workspace', packageName, 'build:prod'])
    runCommand('yarn', ['workspace', packageName, 'publish'])
    await sendMessageToSlack(`Finish the release for npm \`${packageName}\` with version \`${tagName}\``)
  } catch (err) {
    console.error('releaseNpm', err)
    throw new Error(err)
  }
}

const appendCommitInfo = ({ releaseNote, commitLogArr }) => {
  let newReleaseNote = releaseNote
  const COMMIT_INDEX = 0
  const COMMIT_AUTHOR_INDEX = 1
  newReleaseNote = newReleaseNote.concat(`
- ${commitLogArr[COMMIT_INDEX]} | ${
    commitLogArr[COMMIT_AUTHOR_INDEX]
      ? commitLogArr[COMMIT_AUTHOR_INDEX].replace('Author: ', '')
      : commitLogArr[COMMIT_AUTHOR_INDEX]
  } | `)
  return newReleaseNote
}

const appendCommitMessage = ({ releaseNote, commitLogArr }) => {
  let newReleaseNote = releaseNote
  for (let i = 4; i < commitLogArr.length; i++) {
    newReleaseNote = newReleaseNote.concat(
      `${commitLogArr[i] ? commitLogArr[i].replace('\n').replace(/\s{2,}/g, '') : ''}`,
    )
  }
  return newReleaseNote
}

const formatReleaseNote = ({ previousTag, currentTag, commitLog }) => {
  let releaseNote = `
-----------------------------------------------------------------------------
Release: ${currentTag}
Rollback: ${previousTag}
Changes:
commit | author |description
  `
  const footer = `

approver: @willmcvay
monitor: https://sentry.io/organizations/reapit-ltd/projects/
-----------------------------------------------------------------------------
`
  if (!commitLog) {
    return releaseNote.concat(footer)
  }
  const commitArr = commitLog.split('commit ')
  commitArr.forEach(item => {
    const commitLogArr = item.split('\n')
    if (commitLogArr.length > 1) {
      releaseNote = appendCommitInfo({ releaseNote, commitLogArr })
      releaseNote = appendCommitMessage({ releaseNote, commitLogArr })
    }
  })
  releaseNote = releaseNote.concat(footer)
  return releaseNote
}

const getCommitLog = async ({ currentTag, previousTag, packageName }) => {
  const commitLog = runCommand('git', ['log', `${currentTag}...${previousTag}`, `./packages/${packageName}/.`])
  return commitLog
}

const WEB_APPS = [
  'admin-portal',
  'developer-portal',
  'aml-checklist',
  'demo-site',
  'elements',
  'geo-diary',
  'geo-diary-v2',
  'lifetime-legal',
  'marketplace',
  'site-builder',
  'smb-onboarder',
  'web-components',
  'elements-next',
  'reapit-connect',
]

const WEB_COMPONENTS_SERVERLESS_APPS = ['search-widget', 'appointment-planner-component']

const SERVERLESS_APPS = [
  'cognito-custom-mail-lambda',
  'deploy-slack-bot',
  'graphql-server',
  'web-components-config-server',
  ...WEB_COMPONENTS_SERVERLESS_APPS,
]

const NPM_APPS = [
  'cognito-auth',
  'config-manager',
  'elements',
  'foundations-ts-definitions',
  'react-app-scaffolder',
  'web-components',
  'elements-next',
  'connect-session',
  'cra-template-foundations',
]

module.exports = {
  removeUnuseChar,
  getVersionTag,
  releaseServerless,
  releaseNpm,
  runCommand,
  getRef,
  sendMessageToSlack,
  WEB_APPS,
  SERVERLESS_APPS,
  NPM_APPS,
  formatReleaseNote,
  getCommitLog,
  releaseWebApp,
}
