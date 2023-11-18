import { Injectable } from "@angular/core";

import { IExposeInteractAction } from "src/app/domain/interfaces/store/expose/interact-actions";
import { IExposeCollectionRequestPageData } from "src/app/domain/interfaces/expose/expose.interfaces";
import { Expose } from "src/app/domain/models/expose/expose.model";
import { Store } from "../../base/base.store";
import { ExposeState } from "./expose.state";

@Injectable({
  providedIn: 'root'
})
export class ExposeStore extends Store<ExposeState> {

  constructor() {
    super(new ExposeState());
  }

  private updateExposeList(list: Expose[], pageData: IExposeCollectionRequestPageData) {
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
  public dispatch(data: IExposeInteractAction): void {

    switch (data.action) {

      case 'UPDATE_EXPOSE_COLLECTION':
        this.updateExposeList(data.list || [] as Expose[], data.pageData || {} as IExposeCollectionRequestPageData)
        break;

    }

  }
}
