import { put, call } from 'redux-saga/effects'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import {
  developerFetchSubcriptionsList,
  developerDeleteSubcription,
  developerCreateSubscription,
} from '../developer-subscriptions'
import {
  FetchSubscriptionsListParams,
  fetchSubscriptionsList,
  deleteSubscription,
  createDeveloperSubscription,
} from '@/services/developer-subscriptions'
import { PagedResultSubscriptionModel_ } from '@reapit/foundations-ts-definitions'
import { subscriptionModelStub } from '@/sagas/__stubs__/developer-subscriptions'
import {
  developerFetchSubscriptionsSuccess,
  developerFetchSubscriptions,
  developerCreateSubscriptionSuccess,
  developerCreateSubscriptionFalure,
  CreateSubscriptionParams,
} from '@/actions/developer-subscriptions'
import { getDeveloperId } from '@/utils/session'
import { notification } from '@reapit/elements'
import errorMessages from '@/constants/error-messages'

jest.mock('@reapit/elements')
jest.mock('@/services/developer-subscriptions')

describe('developerSubscriptionsSagas', () => {
  describe('developerFetchSubcriptionsList fetch data', () => {
    const params: Action<FetchSubscriptionsListParams> = {
      data: { developerId: 'developerId' },
      type: 'DEVELOPER_FETCH_SUBSCRIPTIONS',
    }
    const gen = cloneableGenerator(developerFetchSubcriptionsList)(params)

    expect(gen.next().value).toEqual(call(fetchSubscriptionsList, { developerId: params.data.developerId }))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next({}).value).toEqual(put(developerFetchSubscriptionsSuccess({} as PagedResultSubscriptionModel_)))
      expect(clone.next().done).toBe(true)
    })

    test('api call error', () => {
      const clone = gen.clone()
      if (!clone.throw) throw new Error('Generator object cannot throw')
      expect(clone.throw('error').value).toEqual(
        notification.error({
          message: errorMessages.DEFAULT_SERVER_ERROR,
          placement: 'bottomRight',
        }),
      )
    })
  })

  describe('developerCreateSubcriptionListen', () => {
    const actionData: CreateSubscriptionParams = {
      params: {
        developerId: '123',
        applicationId: '123',
        user: 'tester@reapit.com',
        type: 'developerEdition',
      },
      onCreated: jest.fn(),
    }
    const params: Action<CreateSubscriptionParams> = {
      data: actionData,
      type: 'DEVELOPER_SUBSCRIPTION_CREATE',
    }
    const gen = cloneableGenerator(developerCreateSubscription)(params)

    expect(gen.next().value).toEqual(call(createDeveloperSubscription, params.data.params))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(subscriptionModelStub).value).toEqual(
        put(developerCreateSubscriptionSuccess(subscriptionModelStub)),
      )
      expect(clone.next().done).toBe(true)
    })

    test('api call error', () => {
      const clone = gen.clone()
      if (!clone.throw) throw new Error('Generator object cannot throw')
      expect(clone.throw('error').value).toEqual(put(developerCreateSubscriptionFalure()))
    })
  })

  describe('developerDeleteSubcription', () => {
    const params: Action<string> = {
      data: 'ID',
      type: 'DEVELOPER_FETCH_SUBSCRIPTIONS',
    }
    const gen = cloneableGenerator(developerDeleteSubcription)(params)

    expect(gen.next().value).toEqual(call(deleteSubscription, { id: params.data }))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next().value).toEqual(call(getDeveloperId))
      expect(clone.next('ID').value).toEqual(put(developerFetchSubscriptions({ developerId: 'ID' })))
      expect(clone.next().done).toBe(true)
    })

    test('api call error', () => {
      const clone = gen.clone()
      if (!clone.throw) throw new Error('Generator object cannot throw')
      expect(clone.throw('error').value).toEqual(
        notification.error({
          message: errorMessages.DEFAULT_SERVER_ERROR,
          placement: 'bottomRight',
        }),
      )
    })
  })
})
