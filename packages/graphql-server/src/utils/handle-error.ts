import logger from '../logger'
import errors from '../errors'
import { ApolloError } from 'apollo-server-lambda'
import { AxiosError } from 'axios'
import { serializeError } from 'serialize-error'

export type HandleErrorParams = {
  error: AxiosError
  traceId: string
  caller: string
}

export const handleError = async ({ error, traceId, caller }: HandleErrorParams): Promise<ApolloError> => {
  const reapitBackendError = error?.response?.data

  logger.error(caller, {
    traceId,
    // either a back-end error or system error (code crash)
    error: reapitBackendError ? reapitBackendError : serializeError(error),
    headers: error?.response?.headers,
  })
  if (error?.response?.status === 400) {
    return errors.generateValidationError(traceId)
  }
  if (error?.response?.status === 401) {
    return errors.generateAuthenticationError(traceId)
  }
  if (error?.response?.status === 403) {
    return errors.generateForbiddenError(traceId)
  }
  if (error?.response?.status === 404) {
    return errors.generateNotFoundError(traceId)
  }
  if (error?.response?.status === 412) {
    return errors.generateUserInputError(traceId)
  }
  if (error?.response?.status === 422) {
    return errors.generateUserInputError(traceId)
  }
  return errors.generateInternalServerError(traceId)
}

export default handleError
