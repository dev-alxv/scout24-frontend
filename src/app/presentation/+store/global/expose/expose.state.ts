import { IExposeCollectionRequestPageData } from "src/app/domain/interfaces/expose/expose.interfaces";
import { Expose } from "src/app/domain/models/expose/expose.model";

export class ExposeState {

  constructor(
    public list?: Expose[],
    public pageData?: IExposeCollectionRequestPageData
  ) {
    this.list = [];
  }
}
