
export interface IExposeCollectionRequest {
  pageData?: {
    pageNumber?: number,
    exposesPerPage?: number
  }
}

export interface IExposeCollectionRequestPageData {
  hasNext: boolean;
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  rowCount: number;
}

export interface IExposeIDs {
  readonly objectID: string,
  readonly externalID: string
}

export interface IExposeImageData {
  className?: string,
  hash?: string,
  isFloorPlan?: boolean,
  urlPath?: string
}
