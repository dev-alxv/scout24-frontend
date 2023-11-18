// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const apiConfig = {
  apiURL: new URL('https://virtualtours.sandbox-immobilienscout24.de/'),
  restURL: new URL('https://rest.sandbox-immobilienscout24.de/'),
  ssoApiURL: new URL('https://sso.immobilienscout24.de/')
}

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
