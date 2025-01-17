import * as React from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { H3, Button, Section, Grid, GridItem, SubTitleH6 } from '@reapit/elements'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect, ReapitConnectSession } from '@reapit/connect-session'
import {
  selectClientId,
  selectLoggedUserEmail,
  selectLoggedUserName,
  selectLoggedUserCompanyName,
} from '@/selector/auth'
import { selectUpdatePasswordLoading } from '@/selector/cognito-identity'
import { changePassword } from '@/actions/cognito-identity'
import ChangePasswordForm, { ChangePasswordValues } from './change-password-form'
import * as styles from './__styles__'

export type CreateDispatchersReturn = {
  changePassword: (values: ChangePasswordValues) => void
  logout: () => void
}

export const createDispatchers = (
  dispatch: Dispatch,
  connectSession: ReapitConnectSession | null,
): CreateDispatchersReturn => {
  return {
    changePassword: (values: ChangePasswordValues) =>
      dispatch(
        changePassword({
          ...values,
          email: connectSession?.loginIdentity.email || '',
        }),
      ),
    logout: () => reapitConnectBrowserSession.connectLogoutRedirect(),
  }
}

export const Settings: React.FC = () => {
  const dispatch = useDispatch()
  const { connectSession, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const { changePassword, logout } = createDispatchers(dispatch, connectSession)
  const loading = useSelector(selectUpdatePasswordLoading)

  const customerId = selectClientId(connectSession)
  const email = selectLoggedUserEmail(connectSession)
  const name = selectLoggedUserName(connectSession)
  const companyName = selectLoggedUserCompanyName(connectSession)

  return (
    <>
      <Section isFlex className="justify-between items-center">
        <H3 className="mb-0">Settings</H3>
        {!connectIsDesktop && (
          <Button dataTest="logout-btn" variant="primary" type="button" onClick={logout}>
            Logout
          </Button>
        )}
      </Section>
      <Section className={styles.userInfoSection}>
        <Grid>
          <GridItem>
            <Grid>
              <GridItem>
                <SubTitleH6>NAME:</SubTitleH6>
              </GridItem>
              <GridItem>
                <p>{name}</p>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem>
            <Grid>
              <GridItem>
                <SubTitleH6>EMAIL ADDRESS:</SubTitleH6>
              </GridItem>
              <GridItem>
                <p>{email}</p>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem>
            <Grid>
              <GridItem>
                <SubTitleH6>COMPANY:</SubTitleH6>
              </GridItem>
              <GridItem>
                <p>{companyName}</p>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem>
            <Grid>
              <GridItem>
                <SubTitleH6>CUSTOMER ID:</SubTitleH6>
              </GridItem>
              <GridItem>
                <p>{customerId}</p>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </Section>
      {!connectIsDesktop && <ChangePasswordForm changePassword={changePassword} loading={loading} />}
    </>
  )
}

export default Settings
