import { ScopeModel } from '@reapit/foundations-ts-definitions'
import { fetcher } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeader } from './utils'
import { logger } from '@reapit/utils'

export const fetchScopeListAPI = async (): Promise<ScopeModel[]> => {
  try {
    const response = await fetcher({
      url: `${URLS.scopes}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: await generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}
