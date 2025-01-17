import { put, fork, takeLatest, call, all } from '@redux-saga/core/effects'
import { notification } from '@reapit/elements'
import {
  fetchAppsSuccess,
  fetchAppsFailed,
  fetchFeatureAppsSuccess,
  fetchFeatureAppsFailed,
  fetchAppDetailSuccess,
  fetchAppDetailFailed,
  fetchAppsInfiniteSuccess,
} from '@/actions/apps'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import { selectDeveloperEditionId } from '@/selector/auth'
import { fetchAppByIdApi, FetchAppByIdParams, fetchAppsApi, FetchAppsParams } from '@/services/apps'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { selectClientId } from '@/selector/auth'
import { fetchApiKeyInstallationById } from '@/services/installations'
import { generateParamsForPreviewApps } from '@/utils/browse-app'

export const fetchApps = function*({ data }) {
  try {
    const { isInfinite, preview } = data
    const connectSession = yield call(reapitConnectBrowserSession.connectSession)
    const developerId = yield call(selectDeveloperEditionId, connectSession)
    const clientId = yield call(selectClientId, connectSession)
    if (!clientId) {
      return
    }

    const defaultParams = {
      clientId,
      developerId: developerId ? [developerId] : [],
      ...data,
    }

    const { fetchAppsParams } = generateParamsForPreviewApps(defaultParams, preview)

    const response = yield call(fetchAppsApi, fetchAppsParams)

    if (isInfinite) {
      yield put(fetchAppsInfiniteSuccess(response))
      return
    }

    yield put(fetchAppsSuccess(response))
  } catch (err) {
    yield put(fetchAppsFailed(err.description))
    notification.error({
      message: err.description,
      placement: 'bottomRight',
    })
  }
}

export const fetchFeatureApps = function*({ data }) {
  try {
    const { preview } = data
    const connectSession = yield call(reapitConnectBrowserSession.connectSession)
    const developerId = yield call(selectDeveloperEditionId, connectSession)
    const clientId = yield call(selectClientId, connectSession)
    if (!clientId) {
      return
    }

    const defaultParams = {
      clientId,
      developerId: developerId ? [developerId] : [],
      isFeatured: true,
      ...data,
    }

    const { fetchFeatureAppsParams } = generateParamsForPreviewApps(defaultParams, preview)

    const response = yield call(fetchAppsApi, fetchFeatureAppsParams)

    yield put(fetchFeatureAppsSuccess(response))
  } catch (err) {
    yield put(fetchFeatureAppsFailed(err.description))
    notification.error({
      message: err.description,
      placement: 'bottomRight',
    })
  }
}

export const fetchAppDetailSagas = function*({ data }: Action<FetchAppByIdParams>) {
  try {
    const appDetailResponse = yield call(fetchAppByIdApi, { ...data })
    if (appDetailResponse?.isWebComponent && appDetailResponse?.installationId) {
      const apiKeyResponse = yield call(fetchApiKeyInstallationById, {
        installationId: appDetailResponse.installationId,
      })
      appDetailResponse.apiKey = apiKeyResponse?.apiKey || ''
    }
    yield put(fetchAppDetailSuccess(appDetailResponse))
  } catch (err) {
    yield put(fetchAppDetailFailed(err.description))
    notification.error({
      message: err.description,
      placement: 'bottomRight',
    })
  }
}

export const appSagasListen = function*() {
  yield takeLatest<Action<FetchAppByIdParams>>(ActionTypes.FETCH_APP_DETAIL, fetchAppDetailSagas)
  yield takeLatest<Action<FetchAppsParams>>(ActionTypes.FETCH_FEATURE_APPS, fetchFeatureApps)
  yield takeLatest<Action<FetchAppsParams>>(ActionTypes.FETCH_APPS, fetchApps)
}

export const appsSagas = function*() {
  yield all([fork(appSagasListen)])
}
