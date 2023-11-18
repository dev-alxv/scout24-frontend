import { Injectable } from "@angular/core";

import { ITourInteractAction } from "src/app/domain/interfaces/store/tour/interact-actions";
import { ITourCollectionRequestPageData } from "src/app/domain/interfaces/tour/tour.interfaces";
import { Tour } from "src/app/domain/models/Tour/tour.model";
import { Store } from "../../base/base.store";
import { TourState } from "./tour.state";

@Injectable({
  providedIn: 'root'
})
export class TourStore extends Store<TourState> {

  constructor() {
    super(new TourState());
  }

  private updateTourList(list: Tour[], pageData: ITourCollectionRequestPageData) {
    this.setState({
      ...this.state,
      list: list.length ? [...list] : list,
      pageData: pageData
    });
  }

  /**
   *
   * @param data : { action }
   */
  public dispatch(data: ITourInteractAction): void {

    switch (data.action) {

      case 'UPDATE_TOUR_COLLECTION':
        this.updateTourList(data.list || [] as Tour[], data.pageData || {} as ITourCollectionRequestPageData);
        break;

    }

  }

}
