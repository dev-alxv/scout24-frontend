import { RequestScopeEnum, TourStatusEnum } from "src/app/domain/enums/tour/tour.enums";

export interface ITourCollectionRequestDescription {
  'p.pageSize'?: number;
  'p.page'?: number;
  scope?: Partial<Record<RequestScopeEnum, boolean>>;
  search?: string;
  status?: TourStatusEnum;
}

export interface IDeleteTourIntentDescription {
  itemID: string;
  tourRemove?: boolean;
  fullRemove?: boolean;
}

export interface ILinkTourIntentDescription {
  userID?: string;
  itemID: string;
  objectID: string;
  portalType?: PortalItemTypes;
}

enum PortalItemTypesEnum {
  IMMOBILIENSCOUT24 = 'IMMOBILIENSCOUT24',
}

export type PortalItemTypes = keyof typeof PortalItemTypesEnum;

export interface IUnlinkTourIntentDescription {
  itemID: string;
}

export interface IApproveTourFloorPlanOrderIntentDescription {
  orderID: string;
  updateEmplannerOrder: boolean;
}

export interface IDeclineTourFloorPlanOrderIntentDescription {
  orderID: string;
  feedback?: string;
}

export interface ITourCollectionSliceDescription {
  hasNext: boolean;
  pageIndex: number;
  pageCount: number;
  rowCount: number;
  pageSize: number;
  list: ITourDescription[];
}

export interface ITourDescription {
  id: string;
  itemID: string;
  internalID: number,
  externalID: string,
  agentID: string,
  name: string;
  created: number; // unix
  modified: number; // unix
  grantAccessAutomatically: boolean;
  limitedAccess: boolean;
  status: number;
  address: ITourAddressDescription,
  user: ITourUserDescription,
  dashboardLinks: IDashboardLinksDescription,
  firstImageUrls: IImagePaths,
  integrationLinks: ITourIntegrationLinksDescription,
  floorPlanOrder: ITourFloorPlanOrderDescription,
  maps: any,
  panoramas: ITourPanoramaDescription[]
}

export interface ITourPanoramaDescription {
  attachments: ITourPanoramaAttachmentsDescription[],
  fileUrls: IImagePaths,
  fileHeight: number,
  fileWidth: number,
  filename: string,
  id: string,
  isFirst: boolean,
  limitedAccess: boolean,
  name: string,
  pitch: number,
  plan: number,
  roll: number,
  source: string,
  status: number,
  type: string
}

export interface ITourPanoramaAttachmentsDescription {
  ID: string,
  attachmentType: string,
  linkedRoom: string,
  linkedRoomID: string,
  xPos: number,
  yPos: number
}

export interface ITourUserDescription {
  id: string,
  email: string
}

export interface ITourIntegrationLinksDescription {
  iframe: string,
  qrCode: string
}

export interface ITourFloorPlanOrderDescription {
  dollhouseOrdered: boolean;
  dollhousePublished: boolean;
  id: string;
  internalId: number;
  status: 'NEW' | 'IN_PROGRESS' | 'NEW_ITERATION_REQUIRED' | 'AWAIT_REVIEW' | 'REVIEW' | 'APPROVED';
}

export interface ITourAddressDescription {
  location: {
    accuracy: string,
    center: {
      latitude: number,
      longitude: number
    }
  },
  coordinates: {
    latitude: number,
    longitude: number
  },
  country: string,
  region: string,
  city: string,
  quarter: string,
  street: string,
  houseNumber: string,
  postcode: string
}

export interface IDashboardLinksDescription {
  deleteItem: string;
  editTour: string;
  downloadPanoImages: string;
  fpZipImages: string;
  tourPlayer: string;
}

export interface IImagePaths {
  AI?: string,
  EDITOR_COPY?: string,
  FULL?: string,
  HD1080?: string,
  HD1606?: string,
  HD2048?: string,
  HD2688?: string,
  ORIGINAL_PATH?: string,
  SMALL?: string,
  THUMB?: string
}

export class TourDescription implements ITourDescription {

  public id: string;
  public itemID: string;
  public internalID: number;
  public externalID: string;
  public agentID: string;
  public name: string;
  public created: number; // unix
  public modified: number; // unix
  public grantAccessAutomatically: boolean;
  public limitedAccess: boolean;
  public status: number;
  public address: ITourAddressDescription;
  public user: ITourUserDescription;
  public dashboardLinks: IDashboardLinksDescription;
  public firstImageUrls: IImagePaths;
  public integrationLinks: ITourIntegrationLinksDescription;
  public floorPlanOrder: ITourFloorPlanOrderDescription;
  public maps: any;
  public panoramas: ITourPanoramaDescription[];

  constructor(tour: ITourDescription) {
    this.id = tour.id;
    this.itemID = tour.itemID;
    this.internalID = tour.internalID;
    this.externalID = tour.externalID;
    this.agentID = tour.agentID;
    this.name = tour.name;
    this.created = tour.created;
    this.modified = tour.modified;
    this.status = tour.status;
    this.limitedAccess = tour.limitedAccess;
    this.grantAccessAutomatically = tour.grantAccessAutomatically;
    this.address = tour.address;
    this.user = tour.user;
    this.dashboardLinks = tour.dashboardLinks;
    this.firstImageUrls = tour.firstImageUrls;
    this.integrationLinks = tour.integrationLinks;
    this.floorPlanOrder = tour.floorPlanOrder;
    this.maps = tour.maps;
    this.panoramas = tour.panoramas;
  }
}
