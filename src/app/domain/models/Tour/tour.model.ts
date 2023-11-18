import { isDefined } from "src/app/utils/utils";
import { TourStatus } from "../../enums/tour/tour.enums";
import { ITourPanoramaAttachmentsDescription, ITourPanoramaDescription, TourDescription } from "../../interfaces/api/descriptions/tour/description";
import {
  ITourIDs,
  ITourLocationData,
  ITourAuthor,
  IDashboardLinks,
  IImagePaths,
  ITourFloorPlans,
  ITourPanoramaFileInfo,
  IPanoramaAttachments,
  IIntegrationLinks
} from "../../interfaces/tour/tour.interfaces";

export class Tour {

  public ids: ITourIDs;
  public name: string;
  public createdDate: string;
  public modifiedDate: string;
  public grantAccessAutomatically: boolean;
  public limitedAccess: boolean;
  public status: TourStatus;
  public locationData: ITourLocationData;
  public author: ITourAuthor;
  public dashboardLinks: IDashboardLinks;
  public mainImagePaths: IImagePaths;
  public integrationLinks: IIntegrationLinks;
  public floorPlans: ITourFloorPlans;
  public panoramas: TourPanorama[];

  constructor(tourDescription: TourDescription) {

    // Set IDs
    this.ids = {
      main: tourDescription.id,
      item: tourDescription.itemID,
      internal: tourDescription.internalID.toString(),
      external: tourDescription.externalID,
      agent: tourDescription.agentID
    };

    this.name = tourDescription.name;
    this.createdDate = new Date(tourDescription.created).toISOString();
    this.modifiedDate = new Date(tourDescription.modified).toISOString();
    this.grantAccessAutomatically = tourDescription.grantAccessAutomatically;
    this.limitedAccess = tourDescription.limitedAccess;

    // Set integration links
    if (isDefined(tourDescription.integrationLinks)) {
      this.integrationLinks = { ...tourDescription.integrationLinks };
    }

    // Set image paths
    if (isDefined(tourDescription.firstImageUrls)) {
      this.mainImagePaths = {
        AI: tourDescription.firstImageUrls.AI,
        editorCopy: tourDescription.firstImageUrls.EDITOR_COPY,
        full: tourDescription.firstImageUrls.FULL,
        hd1080: tourDescription.firstImageUrls.HD1080,
        hd1606: tourDescription.firstImageUrls.HD1606,
        hd2048: tourDescription.firstImageUrls.HD2048,
        hd2688: tourDescription.firstImageUrls.HD2688,
        original: tourDescription.firstImageUrls.ORIGINAL_PATH,
        small: tourDescription.firstImageUrls.SMALL,
        thumb: tourDescription.firstImageUrls.THUMB
      };
    }

    // Set dashboard links
    if (isDefined(tourDescription.dashboardLinks)) {
      this.dashboardLinks = {
        editTour: tourDescription.dashboardLinks.editTour,
        deleteItem: tourDescription.dashboardLinks.deleteItem,
        downloadPanoramas: tourDescription.dashboardLinks.downloadPanoImages,
        fpZipImages: tourDescription.dashboardLinks.fpZipImages,
        tourPlayer: tourDescription.dashboardLinks.tourPlayer
      };
    }

    // Set location data
    if (isDefined(tourDescription.address)) {
      this.locationData = {
        streetAddress: {
          country: tourDescription.address.country,
          region: tourDescription.address.region,
          city: tourDescription.address.city,
          quarter: tourDescription.address.quarter,
          street: tourDescription.address.street,
          houseNumber: tourDescription.address.houseNumber,
          postcode: tourDescription.address.postcode
        },
        mapLocation: {
          accuracy: tourDescription.address.location ? tourDescription.address.location.accuracy : undefined,
          coordinates: {
            latitude: tourDescription.address.coordinates ? tourDescription.address.coordinates.latitude : undefined,
            longitude: tourDescription.address.coordinates ? tourDescription.address.coordinates.longitude : undefined
          }
        }
      };
    }

    // Set creator
    if (isDefined(tourDescription.user)) {
      this.author = { ...tourDescription.user };
    }

    // Set floor plans
    if (isDefined(tourDescription.floorPlanOrder)) {
      this.floorPlans = {
        id: tourDescription.floorPlanOrder.id,
        internalID: tourDescription.floorPlanOrder.internalId.toString(),
        status: tourDescription.floorPlanOrder.status,
        dollhouseOrdered: tourDescription.floorPlanOrder.dollhouseOrdered,
        dollhousePublished: tourDescription.floorPlanOrder.dollhousePublished
      };
    }

    // Set panoramas
    this.panoramas = tourDescription.panoramas.map((description: ITourPanoramaDescription) => new TourPanorama(description));

    // Set status
    if (isDefined(tourDescription.status)) {
      switch (tourDescription.status) {
        case 1:
          this.status = 'active';
          break;

        case 2:
          this.status = 'inactive';
          break;

        default:
          this.status = 'active';
          break
      }
    }
  }

}

export class TourPanorama {

  public id: string;
  public name: string;
  public isFirst: boolean;
  public limitedAccess: boolean;
  public fileInfo: ITourPanoramaFileInfo;
  public status: number;
  public attachments: IPanoramaAttachments[];

  constructor(tourPanoramaDescription: ITourPanoramaDescription) {

    this.id = tourPanoramaDescription.id;
    this.name = tourPanoramaDescription.name;
    this.status = tourPanoramaDescription.status;
    this.isFirst = tourPanoramaDescription.isFirst;
    this.limitedAccess = tourPanoramaDescription.limitedAccess;

    // Set file info
    this.fileInfo = {
      name: tourPanoramaDescription.filename,
      paths: { ...tourPanoramaDescription.fileUrls },
      width: tourPanoramaDescription.fileWidth,
      height: tourPanoramaDescription.fileHeight,
      pitch: tourPanoramaDescription.pitch,
      plan: tourPanoramaDescription.plan,
      roll: tourPanoramaDescription.roll,
      source: tourPanoramaDescription.source,
      type: tourPanoramaDescription.type
    }

    // Set attachments
    if (isDefined(tourPanoramaDescription.attachments)) {
      this.attachments = tourPanoramaDescription.attachments.map((description: ITourPanoramaAttachmentsDescription) => {

        const attachment: IPanoramaAttachments = <IPanoramaAttachments>{
          id: description.ID,
          type: description.attachmentType,
          linkedToRoom: {
            id: description.linkedRoomID,
            file: description.linkedRoom
          },
          position: {
            xPos: description.xPos,
            yPos: description.yPos
          }
        };

        return attachment;
      });
    }
  }
}
