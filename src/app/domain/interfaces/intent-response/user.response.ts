import { IUserPlayerStyles, UserContract } from "../../models/User/user.model";
import { IIntentResponse } from "../common/intent.response";

export interface IUserIntentResponseData extends IIntentResponse {
  userContract?: UserContract;
  userPlayerStyles?: IUserPlayerStyles;
  userPlayerUploadedPreviewLogos?: {
    company?: string;
    tripod?: string;
  };
}
