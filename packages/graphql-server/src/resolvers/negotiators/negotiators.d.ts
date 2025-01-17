import { AuthenticationError, UserInputError } from 'apollo-server-lambda'
import { NegotiatorModel, PagedResultNegotiatorModel_, CreateNegotiatorModel, UpdateNegotiatorModel } from '../../types'

export type CreateNegotiatorArgs = CreateNegotiatorModel

export type UpdateNegotiatorArgs = { id: string; _eTag: string } & UpdateNegotiatorModel

export type GetNegotiatorByIdArgs = {
  id: string
  embed?: string[]
}

export type GetNegotiatorsArgs = {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  id?: string[]
  departmentId?: string[]
  officeId?: string[]
  name?: string
  active?: boolean
}

// api return type
export type GetNegotiatorByIdReturn = Promise<NegotiatorModel | UserInputError>
export type GetNegotiatorsReturn = Promise<PagedResultNegotiatorModel_ | UserInputError>
export type CreateNegotiatorReturn = Promise<NegotiatorModel | UserInputError>
export type UpdateNegotiatorReturn = Promise<NegotiatorModel | UserInputError>

// resolver type
export type QueryGetNegotiatorByIdReturn = AuthenticationError | GetNegotiatorByIdReturn
export type QueryGetNegotiatorsReturn = AuthenticationError | GetNegotiatorsReturn
export type MutationCreateNegotiatorReturn = AuthenticationError | CreateNegotiatorReturn
export type MutationUpdateNegotiatorReturn = AuthenticationError | UpdateNegotiatorReturn
