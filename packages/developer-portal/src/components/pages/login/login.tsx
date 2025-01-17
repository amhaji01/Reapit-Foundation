import * as React from 'react'
import { Link } from 'react-router-dom'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import { showNotificationMessage } from '@/actions/notification-message'
import { Button, Level, FlexContainerBasic, Section } from '@reapit/elements'
import { getDefaultRoute } from '@/utils/auth-route'
import Routes from '@/constants/routes'
import messages from '@/constants/messages'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import connectImage from '@/assets/images/reapit-connect.png'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { wrapper, container, image, register, registerLevel, loginButton } from './__styles__/login'

export type LoginProps = {}

export const handleShowNotificationAfterPasswordChanged = (
  isPasswordChanged: boolean,
  localStorage: Storage,
  dispatch: Dispatch,
) => {
  return () => {
    if (isPasswordChanged) {
      dispatch(showNotificationMessage({ variant: 'info', message: messages.PASSWORD_CHANGED_SUCCESSFULLY }))
      localStorage.removeItem('isPasswordChanged')
    }
  }
}

export const onLoginButtonClick = () => {
  return () => {
    reapitConnectBrowserSession.connectLoginRedirect(getDefaultRoute(true))
  }
}

export const Login: React.FunctionComponent<LoginProps> = () => {
  const dispatch = useDispatch()

  const isPasswordChanged = localStorage.getItem('isPasswordChanged') === 'true'

  React.useEffect(handleShowNotificationAfterPasswordChanged(isPasswordChanged, localStorage, dispatch), [
    isPasswordChanged,
    localStorage,
    dispatch,
  ])

  return (
    <div className={container}>
      <div className={wrapper}>
        <Level>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </Level>
        <Section>
          <p>Welcome to Reapit Foundations</p>
        </Section>
        <Level className={registerLevel}>
          <Button className={loginButton} onClick={onLoginButtonClick()} fullWidth dataTest="login-button">
            Login
          </Button>
          <div className={register}>
            Don&apos;t have an account yet?&nbsp;
            <Link to={Routes.REGISTER}>Register</Link>
          </div>
        </Level>
        <FlexContainerBasic className="pt-8" centerContent>
          {process.env.APP_VERSION}
        </FlexContainerBasic>
      </div>
      <div className={image}>
        <img src={logoImage} alt="Reapit Graphic" />
      </div>
    </div>
  )
}

export default Login
