import { Observable } from "rxjs";

import { IUserIntentResponseData } from "../interfaces/intent-response/user.response";
import { IUploadTourPlayerLogoImagesIntent, IUserChangePlayerStylesIntent, IUserProductOrderIntent } from "../interfaces/user/user.interfaces";

export abstract class UserRepo {

  public abstract getContract(): Observable<IUserIntentResponseData>;
  public abstract getPlayerStyles(userID: string): Observable<IUserIntentResponseData>;
  public abstract changePlayerStyles(styles: IUserChangePlayerStylesIntent, userID: string): Observable<IUserIntentResponseData>;
  public abstract uploadPlayerLogoImages(logoFiles: IUploadTourPlayerLogoImagesIntent): Observable<IUserIntentResponseData>;
  public abstract orderProduct(orderData: IUserProductOrderIntent): Observable<IUserIntentResponseData>;

}
