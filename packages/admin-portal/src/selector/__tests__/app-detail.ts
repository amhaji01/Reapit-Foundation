import {
  selectAppDetailId,
  selectAppDetailInstallationId,
  selectApp,
  selectAppAuthenticationLoading,
  selectAppAuthenticationCode,
} from '../app-detail'
import { appDetailDataStub, appAuthenticationStub } from '@/sagas/__stubs__/app-detail'
import { ReduxState } from '@/types/core'
import appState from '@/reducers/__stubs__/app-state'

describe('app-detail', () => {
  const mockState = {
    ...appState,
    appDetail: {
      appDetailData: appDetailDataStub,
      authentication: appAuthenticationStub,
    },
  } as ReduxState
  describe('selectAppDetailId', () => {
    it('should run correctly', () => {
      const result = selectAppDetailId(mockState)
      expect(result).toEqual(appDetailDataStub.data.id)
    })

    it('should run correctly and return undefined', () => {
      const input = {} as ReduxState
      const result = selectAppDetailId(input)
      expect(result).toEqual(undefined)
    })
  })

  describe('selectAppDetailInstallationId', () => {
    it('should run correctly', () => {
      const result = selectAppDetailInstallationId(mockState)
      expect(result).toEqual(appDetailDataStub.data.installationId)
    })

    it('should run correctly and return undefined', () => {
      const input = {} as ReduxState
      const result = selectAppDetailInstallationId(input)
      expect(result).toEqual(undefined)
    })
  })

  describe('selectApp', () => {
    it('should run correctly', () => {
      const result = selectApp(mockState)
      expect(result).toEqual(mockState.appDetail.appDetailData?.data)
    })
    it('should return {}', () => {
      const input = {} as ReduxState
      const result = selectApp(input)
      expect(result).toEqual(input)
    })
  })

  describe('selectAppAuthenticationLoading', () => {
    it('should run correctly', () => {
      const result = selectAppAuthenticationLoading(mockState)
      expect(result).toEqual(mockState.appDetail.authentication.loading)
    })

    it('should run correctly and return undefined', () => {
      const input = {} as ReduxState
      const result = selectAppAuthenticationLoading(input)
      expect(result).toEqual(undefined)
    })
  })

  describe('selectAppAuthenticationCode', () => {
    it('should run correctly', () => {
      const result = selectAppAuthenticationCode(mockState)
      expect(result).toEqual(mockState.appDetail.authentication.code)
    })

    it('should run correctly and return undefined', () => {
      const input = {} as ReduxState
      const result = selectAppAuthenticationCode(input)
      expect(result).toEqual(undefined)
    })
  })
})