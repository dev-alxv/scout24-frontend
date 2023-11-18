import { ITourCollectionRequestPageData } from "src/app/domain/interfaces/tour/tour.interfaces";
import { Tour } from "src/app/domain/models/Tour/tour.model";

export class TourState {

  constructor(
    public list?: Tour[],
    public pageData?: ITourCollectionRequestPageData
  ) {
    this.list = [];
  }
}
