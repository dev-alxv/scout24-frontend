export const apiConfig = {
  apiURL: new URL('https://virtualtours.immobilienscout24.de/')
}

export const environment = {
  production: true,
  forTestPurpose: false,
  appVersion: '',
  buildNumber: '',
  apiBaseUrl: `${apiConfig.apiURL.href}rest/v2`,
  apiV1BaseUrl: `${apiConfig.apiURL.href}rest/v1`,
  apiV3BaseUrl: `${apiConfig.apiURL.href}rest/v3`,
  portalBaseUrl: `${apiConfig.apiURL.href}portal`
};
