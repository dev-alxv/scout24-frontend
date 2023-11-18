import { isDefined } from "src/app/utils/utils";
import { IExposeDescription } from "../../interfaces/api/descriptions/expose/description";
import { IExposeIDs, IExposeImageData } from "../../interfaces/expose/expose.interfaces";

export class Expose {

  public ids: IExposeIDs;
  public title: string;
  public shortStreetAddress: string;
  public image: IExposeImageData;
  public isLinkedToTour: boolean;

  constructor(exposeDescription: IExposeDescription) {

    // Set ids
    this.ids = {
      objectID: exposeDescription.objectID,
      externalID: exposeDescription.externalID
    };

    // Set image data
    if (isDefined(exposeDescription.image)) {
      this.image = {
        className: exposeDescription.image.className,
        hash: exposeDescription.image.hash,
        isFloorPlan: exposeDescription.image.isFloorPlan,
        urlPath: exposeDescription.image.url
      }
    }

    this.title = exposeDescription.title;
    this.shortStreetAddress = exposeDescription.shortAddress;
    this.isLinkedToTour = exposeDescription.isLinkedToTour;
  }
}
