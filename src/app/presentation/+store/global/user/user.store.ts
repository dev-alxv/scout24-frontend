import { Injectable } from "@angular/core";

import { Store } from "../../base/base.store";
import { UserState } from "./user.state";
import { IUserPlayerPreviewData, IUserPlayerStyles, UserContract } from "src/app/domain/models/User/user.model";
import { IUserInteractAction } from "src/app/domain/interfaces/store/user/interact-actions";

@Injectable({
  providedIn: 'root'
})
export class UserStore extends Store<UserState> {

  constructor() {
    super(new UserState())
  }

  private setUserContract(contract: UserContract): void {
    this.setState({
      ...this.state,
      userContract: contract
    });
  }

  private setPlayerStyles(styles: IUserPlayerStyles): void {
    this.setState({
      ...this.state,
      playerStyles: {
        ...this.state.playerStyles,
        ...styles
      }
    });
  }

  private setPlayerPreviewData(data: IUserPlayerPreviewData): void {
    this.setState({
      ...this.state,
      playerPreviewData: {
        ...this.state.playerPreviewData,
        logoURL: {
          company: data.logoURL.company,
          tripod: data.logoURL.tripod
        }
      }
    });
  }

  private clearPlayerPreviewData(): void {
    this.setState({
      ...this.state,
      playerPreviewData: {
        logoURL: {
          company: '',
          tripod: ''
        }
      }
    });
  }

  /**
   *
   * @param data : { action }
   */
  public dispatch(data: IUserInteractAction): void {

    switch (data.action) {

      case 'SET_USER_CONTRACT':
        this.setUserContract(data.userContract || {} as UserContract);
        break;

      case 'SET_USER_PLAYER_STYLES':
        this.setPlayerStyles(data.userPlayerStyles || {} as IUserPlayerStyles);
        break;

      case 'SET_USER_PLAYER_PREVIEW_DATA':
        this.setPlayerPreviewData(data.userPlayerPreviewData || {} as IUserPlayerPreviewData);
        break;

      case 'CLEAR_USER_PLAYER_PREVIEW_DATA':
        this.clearPlayerPreviewData();
        break;
    }

  }
}
