import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { PrivateRoute, handleRedirectToAuthenticationPage } from '../private-route'
import appState from '@/reducers/__stubs__/app-state'
import { LoginIdentity } from '@reapit/connect-session'
import Routes from '@/constants/routes'
import { MemoryRouter } from 'react-router'
import { getMockRouterProps } from '@/utils/mock-helper'

describe('PrivateRouter', () => {
  const { history } = getMockRouterProps({})
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
  })

  it('should match a snapshot', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.APPS, key: 'clientAppsRoute' }]}>
            <PrivateRoute component={() => null} />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('handleRedirectToAuthenticationPage', () => {
    it('should not redirect to authentication page for DEVELOPER EDITION', () => {
      const mockLoginIdentity = {
        clientId: '',
        developerId: 'testDeveloperId',
      } as LoginIdentity
      const fn = handleRedirectToAuthenticationPage(history, mockLoginIdentity, true)
      fn()
      expect(history.replace).toHaveBeenCalledTimes(0)
    })
    it('should redirect to authentication page for CLIENT', () => {
      const mockLoginIdentity = {
        clientId: '',
        developerId: 'testDeveloperId',
      } as LoginIdentity
      const fn = handleRedirectToAuthenticationPage(history, mockLoginIdentity, false)
      fn()
      expect(history.replace).toBeCalledWith(Routes.AUTHENTICATION)
    })
  })
})
