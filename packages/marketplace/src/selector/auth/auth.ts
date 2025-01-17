import { ReapitConnectSession, LoginIdentity } from '@reapit/connect-session'
import { COGNITO_GROUP_DEVELOPER_EDITION, COGNITO_GROUP_ADMIN_USERS } from '@/constants/api'

export const selectLoginIdentity = (state: ReapitConnectSession | null): LoginIdentity | undefined => {
  return state?.loginIdentity
}

export const selectIsAdmin = (state: ReapitConnectSession | null): boolean => {
  const loginIdentity = selectLoginIdentity(state)

  return Boolean(loginIdentity?.groups?.includes(COGNITO_GROUP_ADMIN_USERS))
}

export const selectClientId = (state: ReapitConnectSession | null): string => {
  return state?.loginIdentity?.clientId || ''
}

export const selectDeveloperId = (state: ReapitConnectSession | null): string => {
  return state?.loginIdentity.developerId || ''
}

export const selectLoggedUserEmail = (state: ReapitConnectSession | null): string => {
  return state?.loginIdentity?.email || ''
}

export const selectLoggedUserName = (state: ReapitConnectSession | null): string => {
  return state?.loginIdentity?.name || ''
}

export const selectLoggedUserCompanyName = (state: ReapitConnectSession | null): string => {
  return state?.loginIdentity?.orgName || ''
}

export const selectDeveloperEditionId = (state: ReapitConnectSession | null): string | null => {
  const loginIdentity = selectLoginIdentity(state)

  if (loginIdentity?.groups.includes(COGNITO_GROUP_DEVELOPER_EDITION)) {
    return state?.loginIdentity?.developerId || ''
  }
  return null
}
