import * as React from 'react'
import { useHelpGuideContext, HelpGuide, Button } from '@reapit/elements'
import Routes from '@/constants/routes'
import { history } from '@/core/router'
import Step1 from '@/assets/images/step-1.png'
import Step2 from '@/assets/images/step-2.png'
import Step3 from '@/assets/images/step-3.png'
import Step4 from '@/assets/images/step-4.png'
import Step5 from '@/assets/images/step-5.png'
import { link } from '@/styles/elements/link'
import { setCookieString, COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE, COOKIE_MAX_AGE_INFINITY } from '@/utils/cookie'
import { content } from './__styles__/welcome'

export interface DevelopeWelcomeMappedActions {}

export type DeveloperWelcomeMessageProps = DevelopeWelcomeMappedActions

export const Welcome = () => {
  const { goNext } = useHelpGuideContext()
  return (
    <div className={content}>
      <p className="mb-5">
        Thank you for registering as a Reapit Foundations Developer. Within this portal, you will have access to
        detailed documentation on all our APIs, full access to Reapit elements and Sandbox data. All available to assist
        you in building and listing your apps on the Marketplace.
      </p>
      <p className="mb-5">
        We understand how important it is to have the right tools to enable you to produce the best applications for
        your customers. With that in mind, let us show you what’s available to help you to get started.
      </p>
      <Button type="button" variant="primary" onClick={handleChangeSteps(goNext)}>
        Next
      </Button>
    </div>
  )
}

export const Documentation = () => {
  const { goNext, goPrev } = useHelpGuideContext()

  return (
    <div className={content}>
      <p className="mb-5">
        As Developers, we know detailed documentation and support is paramount when building any application. Therefore,
        we have created various sections to provide additional help and support. Each section can be accessed from the
        navigation bar. For example:
      </p>
      <div className="mb-5">
        <p>
          <strong>
            <a className={link} href={Routes.SWAGGER}>
              APIs
            </a>
          </strong>
        </p>
        Our interactive documentation allows you to easily experiment with our APIs with a &lsquo;Try it now&rsquo;
        function to quickly build requests and inspect responses. To try it yourself and to see what data is available,
        click{' '}
        <a className={link} href={Routes.SWAGGER}>
          here
        </a>
        .
      </div>
      <div className="mb-5">
        <p>
          <strong>
            <a
              className={link}
              target="_blank"
              rel="noopener noreferrer"
              href={'https://foundations-documentation.reapit.cloud/api/web#elements'}
            >
              Elements
            </a>
          </strong>
        </p>
        Also included within your account are Reapit{' '}
        <a
          className={link}
          target="_blank"
          rel="noopener noreferrer"
          href={'https://foundations-documentation.reapit.cloud/api/web#elements'}
        >
          &lsquo;Elements&rsquo;
        </a>
        . Providing a host of components which have been tested to work with a mobile or desktop application and allows
        you to build your Apps in compliance with our Reapit Brand Guidelines.
      </div>
      <Button type="button" variant="primary" onClick={handleChangeSteps(goPrev)}>
        Prev
      </Button>
      <Button type="button" variant="primary" onClick={handleChangeSteps(goNext)}>
        Next
      </Button>
    </div>
  )
}

export const Submitting = () => {
  const { goNext, goPrev } = useHelpGuideContext()
  return (
    <div className={content}>
      <p className="mb-5">
        To start building and interacting with the platform, you will need to first create an app. Using the ‘Create New
        App’ option under ‘Apps’, you will be required to provide some basic information such as an app name, the type
        of integration, authentication and what data you wish to interact with (permissions).
      </p>
      <p className="mb-5">
        When you are ready for it to be published on the Marketplace, you will need to change the status to ‘Listed’. At
        that point, we will require some additional information, screenshots, description, contact details etc. It is
        important to be as concise and as detailed as possible to make sure you are submitting a quality marketplace
        listing. More information on submitting your content can be found{' '}
        <a
          className={link}
          href="https://foundations-documentation.reapit.cloud/whats-new#summary"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>{' '}
        .
      </p>
      <p className="mb-5">
        To list your app in the Marketplace, simply select the ‘Is Listed’ option when editing your app listing. Admin
        approval for revisions and subscription charges will only apply when your app is set to ‘Listed’.
      </p>
      <Button type="button" variant="primary" onClick={handleChangeSteps(goPrev)}>
        Prev
      </Button>
      <Button type="button" variant="primary" onClick={handleChangeSteps(goNext)}>
        Next
      </Button>
    </div>
  )
}

export const Managing = () => {
  const { goNext, goPrev } = useHelpGuideContext()
  return (
    <div className={content}>
      <p className="mb-5">
        If you need to make a change to your App listing, such as an update to a screenshot, to edit text, or request
        additional permissions, you can do so by clicking ‘Edit Details’ from the ‘Apps’ page. However, if your app is
        ‘Listed’, our Admin Team will need to approve any revisions.
      </p>
      <p className="mb-5">
        Should you wish to cancel your revision, simply click the ‘Pending Revisions’ option. From your app page you
        will also be able to handle any client installations by viewing the ‘Installations’ table.
      </p>
      <Button type="button" variant="primary" onClick={handleChangeSteps(goPrev)}>
        Prev
      </Button>
      <Button type="button" variant="primary" onClick={handleChangeSteps(goNext)}>
        Next
      </Button>
    </div>
  )
}

export const Support = () => {
  const { goPrev } = useHelpGuideContext()
  return (
    <div className={content}>
      <p className="mb-5">
        You are currently logged into our Beta release of Reapit Foundations and we are continuing to update, add
        additional features and address any issues that may appear. In the meantime, if you would like to request a
        feature or report a bug, this can be done from the ‘Help’ section on the left.
      </p>

      <p className="mb-5">
        We are excited to be working with you and hope to see your application in the Marketplace soon.
      </p>
      <Button type="button" variant="primary" onClick={handleChangeSteps(goPrev)}>
        Prev
      </Button>
      <Button variant="primary" type="button" onClick={handleUserAccept(history)}>
        Get Started
      </Button>
    </div>
  )
}

export const handleUserAccept = history => () => {
  setCookieString(COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE, new Date(), COOKIE_MAX_AGE_INFINITY)

  history.push(Routes.APPS)
}

export const handleChangeSteps = (goTo: () => void) => () => {
  goTo()
}

export const DeveloperWelcomeMessage: React.FC<DeveloperWelcomeMessageProps> = () => {
  return (
    <HelpGuide>
      <HelpGuide.Step
        id="step-1"
        component={Welcome}
        heading="Welcome to Reapit Foundations"
        subHeading="Let’s get started."
        graphic={<img className="w-100" alt="step-1" src={Step1} />}
      />
      <HelpGuide.Step
        id="step-2"
        component={Documentation}
        heading="Documentation"
        subHeading="We’ve got you covered."
        graphic={<img className="w-100" alt="step-2" src={Step2} />}
      />
      <HelpGuide.Step
        id="step-3"
        component={Submitting}
        heading="Submitting an App"
        subHeading="Nearly there."
        graphic={<img className="w-100" alt="step-3" src={Step3} />}
      />
      <HelpGuide.Step
        id="step-4"
        component={Managing}
        heading="Managing your App"
        subHeading="Installations and changes."
        graphic={<img className="w-100" alt="step-4" src={Step4} />}
      />
      <HelpGuide.Step
        id="step-5"
        component={Support}
        heading="On going support"
        subHeading="We’re here to help."
        graphic={<img className="w-100" alt="step-5" src={Step5} />}
      />
    </HelpGuide>
  )
}

export default DeveloperWelcomeMessage
