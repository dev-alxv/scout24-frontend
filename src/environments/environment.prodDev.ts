export const apiConfig = {
  apiURL: new URL('https://virtualtours.sandbox-immobilienscout24.de/'),
  restURL: new URL('https://rest.sandbox-immobilienscout24.de/'),
  ssoApiURL: new URL('https://sso.immobilienscout24.de/')
}

export const environment = {
  production: true,
  forTestPurpose: true,
  appVersion: '',
  buildNumber: '',
  apiBaseUrl: `${apiConfig.apiURL.href}rest/v2`,
  apiV1BaseUrl: `${apiConfig.apiURL.href}rest/v1`,
  apiV3BaseUrl: `${apiConfig.apiURL.href}rest/v3`,
  portalBaseUrl: `${apiConfig.apiURL.href}portal`,
  immoMainApiBaseUrl: `${apiConfig.apiURL.href}restapi/api`,
  ssoApiBaseUrl: `${apiConfig.apiURL.href}sso`
};
