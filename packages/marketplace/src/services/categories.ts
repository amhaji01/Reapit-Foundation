import { PagedResultCategoryModel_ } from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeader } from './utils'
import { logger } from '@reapit/utils'
import { FetchListCommonParams } from './types'

export type FetchCategoriesParams = FetchListCommonParams

export const fetchCategoriesApi = async (params: FetchCategoriesParams): Promise<PagedResultCategoryModel_> => {
  try {
    const response = await fetcher({
      url: `${URLS.categories}?${setQueryParams(params)}`,
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
