/**
 * TODO: will refactor this to separate DEVELOPER PORTAL ACTIONS, CLIENT AND ADMIN
 * by <<PORTAL_NAME>>_<<ACTION NAME>>
 * Please follow the <<STATE>>_<<ACTION_TYPE>> pattern and group actions by STATE
 */
const ActionTypes = {
  // integration types
  FETCH_DESKTOP_INTEGRATION_TYPES: 'FETCH_DESKTOP_INTEGRATION_TYPES',
  FETCH_DESKTOP_INTEGRATION_TYPES_SUCCESS: 'FETCH_DESKTOP_INTEGRATION_TYPES_SUCCESS',
  FETCH_DESKTOP_INTEGRATION_TYPES_FAILED: 'FETCH_DESKTOP_INTEGRATION_TYPES_FAILED',

  // categories
  FETCH_CATEGORIES: 'FETCH_CATEGORIES',
  FETCH_CATEGORIES_SUCCESS: 'FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILED: 'FETCH_CATEGORIES_FAILED',

  FETCH_APPS: 'FETCH_APPS',
  FETCH_APPS_FAILED: 'FETCH_APPS_FAILED',
  FETCH_APPS_SUCCESS: 'FETCH_APPS_SUCCESS',
  FETCH_APPS_INFINITE_SUCCESS: 'FETCH_APPS_INFINITE_SUCCESS',

  FETCH_FEATURE_APPS: 'FETCH_FEATURE_APPS',
  FETCH_FEATURE_APPS_FAILED: 'FETCH_FEATURE_APPS_FAILED',
  FETCH_FEATURE_APPS_SUCCESS: 'FETCH_FEATURE_APPS_SUCCESS',

  FETCH_APP_DETAIL: 'FETCH_APP_DETAIL',
  FETCH_APP_DETAIL_SUCCESS: 'FETCH_APP_DETAIL_SUCCESS',
  FETCH_APP_DETAIL_FAILED: 'FETCH_APP_DETAIL_FAILED',

  FETCH_NEGOTIATORS: 'FETCH_NEGOTIATORS',
  FETCH_NEGOTIATORS_FAILED: 'FETCH_NEGOTIATORS_FAILED',
  FETCH_NEGOTIATORS_SUCCESS: 'FETCH_NEGOTIATORS_SUCCESS',

  FETCH_WEB_COMPONENT_CONFIG: 'FETCH_WEB_COMPONENT_CONFIG',
  FETCH_WEB_COMPONENT_CONFIG_SUCCESS: 'FETCH_WEB_COMPONENT_CONFIG_SUCCESS',
  FETCH_WEB_COMPONENT_CONFIG_FAILED: 'FETCH_WEB_COMPONENT_CONFIG_FAILED',

  UPDATE_WEB_COMPONENT_CONFIG: 'UPDATE_WEB_COMPONENT_CONFIG',
  UPDATE_WEB_COMPONENT_CONFIG_SUCCESS: 'UPDATE_WEB_COMPONENT_CONFIG_SUCCESS',
  UPDATE_WEB_COMPONENT_CONFIG_FAILED: 'UPDATE_WEB_COMPONENT_CONFIG_FAILED',

  INSTALL_APP: 'INSTALL_APP',
  INSTALL_APP_SUCCESS: 'INSTALL_APP_SUCCESS',
  INSTALL_APP_FAILED: 'INSTALL_APP_FAILED',

  UNINSTALL_APP: 'UNINSTALL_APP',
  UNINSTALL_APP_SUCCESS: 'UNINSTALL_APP_SUCCESS',
  UNINSTALL_APP_FAILED: 'UNINSTALL_APP_FAILED',

  //settings
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_FAILED: 'CHANGE_PASSWORD_FAILED',
}

export default ActionTypes
