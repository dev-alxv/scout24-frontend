import { RequestScopeEnum } from "../../enums/tour/tour.enums";

export interface ITourCollectionRequest {
  pageData?: {
    pageNumber?: number,
    toursPerPage?: number
  },
  searchData?: {
    input: string
  },
  requestScope?: Partial<Record<RequestScopeEnum, boolean>>
}

export interface ITourCollectionRequestPageData {
  hasNext: boolean;
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  rowCount: number;
}

export interface ITourLinkIntent {
  tourItemId: string;
  exposeObjectId: string;
}

export interface ITourUnlinkIntent {
  tourItemId: string;
}

export interface IDeleteTourIntent {
  tourItemId: string;
}

export interface IApproveTourFloorplanOrderIntent {
  orderId: string;
}

export interface IDeclineTourFloorplanOrderIntent {
  orderId: string;
  feedback: string;
}

export interface ITourIDs {
  readonly main: string;
  readonly item: string;
  readonly internal: string;
  readonly external: string;
  readonly agent: string;
}

export interface ITourAuthor {
  id?: string;
  email?: string;
}

export interface ITourLocationData {
  streetAddress?: {
    country?: string,
    region?: string,
    city?: string,
    quarter?: string,
    street?: string,
    houseNumber?: string,
    postcode?: string
  },
  mapLocation?: {
    accuracy?: string,
    coordinates?: {
      latitude?: number,
      longitude?: number
    }
  }
}

export interface IDashboardLinks {
  deleteItem?: string;
  editTour?: string;
  downloadPanoramas?: string;
  fpZipImages?: string;
  tourPlayer?: string;
}

export interface IImagePaths {
  AI?: string,
  editorCopy?: string,
  full?: string,
  hd1080?: string,
  hd1606?: string,
  hd2048?: string,
  hd2688?: string,
  original?: string,
  small?: string,
  thumb?: string
}

export interface IIntegrationLinks {
  iframe: string,
  qrCode: string
}

export interface ITourFloorPlans {
  dollhouseOrdered?: boolean;
  dollhousePublished?: boolean;
  id?: string;
  internalID?: string;
  status: 'NEW' | 'IN_PROGRESS' | 'NEW_ITERATION_REQUIRED' | 'AWAIT_REVIEW' | 'REVIEW' | 'APPROVED';
}

export interface ITourPanoramaFileInfo {
  name?: string,
  paths?: IImagePaths,
  width?: number,
  height?: number,
  pitch?: number,
  plan?: number,
  roll?: number,
  source?: string,
  type?: string
}

export interface IPanoramaAttachments {
  id?: string,
  type?: string,
  linkedToRoom?: {
    id: string,
    file: string
  },
  position?: {
    xPos: number,
    yPos: number
  }
}
