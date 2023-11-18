import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { UserRepo } from "../repository/user.repo";
import { IUserIntentResponseData } from "../interfaces/intent-response/user.response";
import { IUploadTourPlayerLogoImagesIntent, IUserChangePlayerStylesIntent, IUserProductOrderIntent } from "../interfaces/user/user.interfaces";

@Injectable()
export class UserManager {

  constructor(
    private userRepo: UserRepo
  ) { }

  public getContract(): Observable<IUserIntentResponseData> {
    return this.userRepo.getContract();
  }

  public getPlayerStyles(userID: string): Observable<IUserIntentResponseData> {
    return this.userRepo.getPlayerStyles(userID);
  }

  public changePlayerStyles(styles: IUserChangePlayerStylesIntent, userID: string): Observable<IUserIntentResponseData> {
    return this.userRepo.changePlayerStyles(styles, userID);
  }

  public uploadPlayerLogoImages(logoFiles: IUploadTourPlayerLogoImagesIntent): Observable<IUserIntentResponseData> {
    return this.userRepo.uploadPlayerLogoImages(logoFiles);
  }

  public orderProduct(orderData: IUserProductOrderIntent): Observable<IUserIntentResponseData> {
    return this.userRepo.orderProduct(orderData);
  }
}
