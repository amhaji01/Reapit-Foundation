import { all, fork, call, put, takeLatest } from 'redux-saga/effects'
import { Action } from '@/types/core'
import { FetchDeveloperByIdParams, fetchDeveloperById } from '@/services/developers'
import errorMessages from '@/constants/error-messages'
import ActionTypes from '@/constants/action-types'
import { fetchDeveloperDetailsSuccess, fetchDeveloperDetailsFailed } from '@/actions/developers'
import { notification } from '@reapit/elements'

export const fetchDeveloperDetails = function*({ data }: Action<FetchDeveloperByIdParams>) {
  try {
    const { id } = data
    if (!id) throw new Error('Missing some data')
    const response = yield call(fetchDeveloperById, { id })
    yield put(fetchDeveloperDetailsSuccess(response))
  } catch (err) {
    yield put(fetchDeveloperDetailsFailed())
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
    })
  }
}

export const fetchDeveloperDetailsListen = function*() {
  yield takeLatest<Action<FetchDeveloperByIdParams>>(ActionTypes.FETCH_DEVELOPER_DETAILS, fetchDeveloperDetails)
}

export const developerDetailsListSagas = function*() {
  yield all([fork(fetchDeveloperDetailsListen)])
}

export default developerDetailsListSagas
