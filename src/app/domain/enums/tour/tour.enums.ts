export enum FileTypeUrlEnum {
  HD2688 = 'HD2688',
  FULL = 'FULL',
  HD1080 = 'HD1080',
  ORIGINAL_PATH = 'ORIGINAL_PATH',
  AI = 'AI',
  HD2048 = 'HD2048',
  HD1606 = 'HD1606',
  EDITOR_COPY = 'EDITOR_COPY',
  SMALL = 'SMALL',
  THUMB = 'THUMB',
}

export enum RequestScopeEnum {
  panoramas = 'panoramas',
  scopeOfWork = 'scopeOfWork',
  attachments = 'attachments',
  USER_SNIPPET = 'USER_SNIPPET',
  internalID = 'internalID',
  externalID = 'externalID',
  floorplanorder = 'floorplanorder',
  firstImageUrls = 'firstImageUrls',
  LINKS_DASHBOARD = 'LINKS_DASHBOARD',
  integration = 'integration',
  address = 'address',
  externalID_IMMOBILIENSCOUT24 = 'externalID_IMMOBILIENSCOUT24',
}

export enum Integration {
  integration = 'integration',
  iframe = 'integration.iframe',
  qrCode = 'integration.qrCode',
  pdf = 'integration.pdf',
}

export enum TourStatusEnum {
  active = 1,
  inactive = 2,
}

export type TourStatus = keyof typeof TourStatusEnum;
