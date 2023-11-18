import { IUserPlayerPreviewData, IUserPlayerStyles, User, UserContract } from "src/app/domain/models/User/user.model";

export class UserState {

  constructor(
    public user?: User,
    public userContract?: UserContract,
    public playerStyles?: IUserPlayerStyles,
    public playerPreviewData?: IUserPlayerPreviewData
  ) {

    // Init user
    this.user = <User>{
      id: ''
    }

    // Init player styles
    this.playerStyles = <IUserPlayerStyles>{
      mainColor: {
        r: 0,
        g: 0,
        b: 0
      },
      logoUrl: '',
      hotspotLogo: '',
      tripodCoverLogo: ''
    }

    this.playerPreviewData = <IUserPlayerPreviewData>{
      logoURL: {
        company: '',
        tripod: ''
      }
    }
  }
}
