
export interface IExposeCollectionRequestDescription {
  'p.pageSize'?: number;
  'p.page'?: number;
}

export interface IExposeCollectionSliceDescription {
  details: {
    class: string;
    hasNext: boolean;
    pageIndex: number;
    pageCount: number;
    rowCount: number;
    pageSize: number;
    list: IExposeDescription[];
  }
  type: string;
}

export interface IExposeDescription {
  externalID: string;
  objectID: string;
  title: string;
  shortAddress: string;
  isLinkedToTour: boolean;
  image: IExposeImageDescription
}

export interface IExposeImageDescription {
  className: string;
  hash: string;
  url: string;
  isFloorPlan: boolean;
}

export class ExposeDescription implements IExposeDescription {

  public externalID: string;
  public objectID: string;
  public title: string;
  public shortAddress: string;
  public isLinkedToTour: boolean;
  public image: IExposeImageDescription;

  constructor(expose: IExposeDescription) {
    this.externalID = expose.externalID;
    this.objectID = expose.objectID;
    this.title = expose.title;
    this.shortAddress = expose.shortAddress;
    this.isLinkedToTour = expose.isLinkedToTour;
    this.image = expose.image;
  }
}
