import * as React from 'react'
import { shallow } from 'enzyme'
import { getAccessToken } from '@/utils/session'

import Swagger, { handleOnComplete, fetchInterceptor, fetchAccessToken, InterceptorParams } from '../swagger'

jest.mock('../../../../core/store')
jest.mock('@/utils/session')

describe('Swagger', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Swagger />)).toMatchSnapshot()
  })

  it('should have a fetchInterceptor that adds a token when the url is not swagger', () => {
    window.reapit.config.swaggerUrl = 'https://some-url.com'
    const request = {
      url: 'https://some-other-url.com',
      headers: {
        'Content-Type': 'application/json',
      },
    } as InterceptorParams
    const token = 'SOME_TOKEN'
    const result = fetchInterceptor(request, token)
    const output = {
      ...request,
      headers: {
        ...request.headers,
        'api-version': '2020-01-31',
        Authorization: `Bearer ${token}`,
      },
    }
    expect(result).toEqual(output)
  })

  it('should have a fetchInterceptor that returns the params when the url is swagger', async () => {
    window.reapit.config.swaggerUrl = 'https://some-url.com'
    const request = {
      url: 'https://some-url.com',
      headers: {
        'Content-Type': 'application/json',
      },
    } as InterceptorParams
    const token = 'SOME_TOKEN'
    const result = await fetchInterceptor(request, token)
    expect(result).toEqual(request)
  })

  it('handles onComplete', () => {
    ;(global as any).document.querySelector = jest.fn(() => ({
      innerHTML: '<span>text</span>',
    }))
    const setLoading = jest.fn()
    const fn = handleOnComplete(setLoading)
    fn()
    const spy = jest.spyOn(document, 'querySelector')
    expect(spy).toBeCalledWith('a[href="https://dev.platform.reapit.cloud/docs"]')
    expect(setLoading).toBeCalledWith(false)
  })

  it('sets the accessToken', async () => {
    const token = 'SOME_TOKEN'
    ;(getAccessToken as jest.Mock).mockImplementation(() => token)
    const setAccessToken = jest.fn()

    await fetchAccessToken(setAccessToken)

    expect(setAccessToken).toBeCalledWith(token)
  })
})
