import { Component, ViewEncapsulation, Inject, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { rgbToHex } from '@angular-material-components/color-picker';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FileInput } from 'ngx-material-file-input';

import { UserStore } from 'src/app/presentation/+store/global/user/user.store';
import { IUserPlayerStyles } from 'src/app/domain/models/User/user.model';
import { UserState } from 'src/app/presentation/+store/global/user/user.state';
import { UserService } from 'src/app/presentation/+store/+services/user/user.service';
import { ModalTemplateInputData } from 'src/app/domain/interfaces/modal/modal.interfaces';
import { IUploadTourPlayerLogoImagesIntent, IUserChangePlayerStylesIntent } from 'src/app/domain/interfaces/user/user.interfaces';
import { UiStateStore } from 'src/app/presentation/+store/global/ui-state/ui-state.store';
import { uiOngoingActions, UiState } from 'src/app/presentation/+store/global/ui-state/ui.state';
import { apiConfig } from 'src/environments/environment';

@UntilDestroy()

@Component({
  selector: 'scout24-scout-branding-dialog',
  templateUrl: './scout-branding-dialog.component.html',
  styleUrls: ['./scout-branding-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScoutBrandingDialogComponent implements OnInit, AfterViewInit {

  public colorCtrFooter: AbstractControl = new FormControl(null);
  public colorCtrFocus: AbstractControl = new FormControl(null);
  public userPlayerStyles: IUserPlayerStyles;
  public userPlayerColorHEX: string;
  public userPlayerColorHEXSecondary: string;
  public playerIframeLink: SafeResourceUrl;
  public playerIframeBaseLink: string;
  public uploadedWatermarkImage: FileInput | null;
  public uploadedTripodImage: FileInput | null;
  public saveButtonEnabled = false;
  public stylesSetInProgress = false;
  public previewSetInProgress = false;

  private defaultPlayerColor: string = '#00FFD0';
  private previewPlayerColor: string;
  private previewPlayerColorSecondary: string;
  private previewWatermarkImageURL: string;
  private previewWTripodImageURL: string;

  @ViewChild('watermarkInput') watermarkInput: ElementRef<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalTemplateInputData,
    private dialogRef: MatDialog,
    private translate: TranslateService,
    private sanitizer: DomSanitizer,
    private userStore: UserStore,
    private userService: UserService,
    private uiStateStore: UiStateStore
  ) { }

  public ngOnInit(): void {
    this.observeUserState();
    this.observeUiState();
  }

  private observeUserState(): void {

    this.userStore.stateStream$
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (userState: UserState) => {

          if (userState) {
            this.userPlayerStyles = userState.playerStyles || {};

            this.playerIframeBaseLink = `${apiConfig.apiURL.href}portal/tour/showCustomized/${userState.userContract?.ids.user}`;

            if (userState.playerStyles?.mainColor && !this.previewPlayerColor) {
              this.colorCtrFooter.setValue('#' + rgbToHex(userState.playerStyles?.mainColor?.r, userState.playerStyles?.mainColor?.g, userState.playerStyles?.mainColor?.b));
              this.userPlayerColorHEX = '#' + rgbToHex(userState.playerStyles?.mainColor?.r, userState.playerStyles?.mainColor?.g, userState.playerStyles?.mainColor?.b);
            }

            if (userState.playerStyles?.secondaryColor && !this.previewPlayerColor) {
              this.colorCtrFocus.setValue('#' + rgbToHex(userState.playerStyles?.secondaryColor?.r, userState.playerStyles?.secondaryColor?.g, userState.playerStyles?.secondaryColor?.b));
              this.userPlayerColorHEXSecondary = '#' + rgbToHex(userState.playerStyles?.secondaryColor?.r, userState.playerStyles?.secondaryColor?.g, userState.playerStyles?.secondaryColor?.b);
            }

            if (userState.playerPreviewData && userState.playerPreviewData.logoURL.company !== '' ||
              userState.playerPreviewData && userState.playerPreviewData.logoURL.tripod !== '') {

              if (userState.playerPreviewData.logoURL.company) {
                this.previewWatermarkImageURL = userState.playerPreviewData.logoURL.company;
              }

              if (userState.playerPreviewData.logoURL.tripod) {
                this.previewWTripodImageURL = userState.playerPreviewData.logoURL.tripod;
              }

              this.uploadedWatermarkImage = null;
              this.uploadedTripodImage = null;

              this.saveButtonEnabled = true;
              this.setPreviewStyles();
            } else {
              this.initPlayerIframeLink(userState);
            }

          }
        }
      });
  }

  private observeUiState(): void {

    this.uiStateStore.stateStream$
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (state: UiState) => this.parseUiState(state.uiOngoingActions)
      });
  }

  private parseUiState(state?: uiOngoingActions): void {
    if (this.stylesSetInProgress && !state?.apiIntent?.savingPlayerStyles) {
      this.cancel();
    }

    if (state?.apiIntent && state?.apiIntent.savingPlayerStyles !== undefined) {
      this.stylesSetInProgress = state.apiIntent.savingPlayerStyles;
    }

    if (state?.apiIntent && state?.apiIntent.uploadingPlayerLogoImage !== undefined) {
      this.previewSetInProgress = state.apiIntent.uploadingPlayerLogoImage;
    }
  }

  public cancel(): void {
    this.dialogRef.closeAll();
  }

  public save(): void {
    this.stylesSetInProgress = true;

    const userPlayerLogoUrl: string | null = this.userPlayerStyles.logoUrl && this.userPlayerStyles.logoUrl !== '' ? this.userPlayerStyles.logoUrl : null;

    let rgbData: number[] = [];
    let rgbDataSecondary: number[] = [];
    let playerStyles: IUserChangePlayerStylesIntent = <IUserChangePlayerStylesIntent>{}

    const hexToRgb = (hex: any) =>
      hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
        , (m: any, r: any, g: any, b: any) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map((x: any) => parseInt(x, 16));

    if (this.colorCtrFooter.value.hex) {
      rgbData = hexToRgb('#' + this.colorCtrFooter.value.hex);
    } else {
      rgbData = hexToRgb(this.colorCtrFooter.value);
    }

    if (this.colorCtrFocus.value.hex) {
      rgbDataSecondary = hexToRgb('#' + this.colorCtrFocus.value.hex);
    } else {
      rgbDataSecondary = hexToRgb(this.colorCtrFocus.value);
    }

    playerStyles = <IUserChangePlayerStylesIntent>{
      logoUrl: this.previewWatermarkImageURL ? this.previewWatermarkImageURL : userPlayerLogoUrl,
      tripodCoverLogo: this.previewWTripodImageURL ? this.previewWTripodImageURL : this.userPlayerStyles.tripodCoverLogo,
      mainColor: {
        r: rgbData[0],
        g: rgbData[1],
        b: rgbData[2]
      },
      secondaryColor: {
        r: rgbDataSecondary[0],
        g: rgbDataSecondary[1],
        b: rgbDataSecondary[2]
      }
    };

    this.userService.changeUserPlayerStyles(playerStyles);
  }

  public previewStyles(): void {

    if (this.uploadedWatermarkImage !== undefined && this.uploadedWatermarkImage !== null ||
      this.uploadedTripodImage !== undefined && this.uploadedTripodImage !== null) {

      const uploadImageFilesIntent: IUploadTourPlayerLogoImagesIntent = <IUploadTourPlayerLogoImagesIntent>{
        company: this.uploadedWatermarkImage !== null && this.uploadedWatermarkImage !== undefined ? this.uploadedWatermarkImage.files[0] : undefined,
        tripodCover: this.uploadedTripodImage !== null && this.uploadedTripodImage !== undefined ? this.uploadedTripodImage.files[0] : undefined
      }

      if (this.colorCtrFooter.value !== this.userPlayerColorHEX) {

        this.previewPlayerColor = this.colorCtrFooter.value;
        this.previewPlayerColorSecondary = this.userPlayerColorHEXSecondary;

      } else if (this.colorCtrFocus.value !== this.userPlayerColorHEXSecondary) {

        this.previewPlayerColor = this.userPlayerColorHEX;
        this.previewPlayerColorSecondary = this.colorCtrFocus.value;

      } else if (this.colorCtrFooter.value !== this.userPlayerColorHEX && this.colorCtrFocus.value !== this.userPlayerColorHEXSecondary) {

        this.previewPlayerColor = this.colorCtrFooter.value;
        this.previewPlayerColorSecondary = this.colorCtrFocus.value;

      }

      this.userService.uploadLogoImages(uploadImageFilesIntent);
    } else {
      if (this.colorCtrFooter.value !== this.userPlayerColorHEX) {

        this.previewPlayerColor = this.colorCtrFooter.value;
        this.previewPlayerColorSecondary = this.userPlayerColorHEXSecondary;

        this.setPreviewStyles(true);
      } else if (this.colorCtrFocus.value !== this.userPlayerColorHEXSecondary) {

        this.previewPlayerColor = this.userPlayerColorHEX;
        this.previewPlayerColorSecondary = this.colorCtrFocus.value;

        this.setPreviewStyles(true);
      } else if (this.colorCtrFooter.value !== this.userPlayerColorHEX && this.colorCtrFocus.value !== this.userPlayerColorHEXSecondary) {

        this.previewPlayerColor = this.colorCtrFooter.value;
        this.previewPlayerColorSecondary = this.colorCtrFocus.value;

        this.setPreviewStyles(true);
      }
    }
  }

  public ngAfterViewInit(): void {

  }

  private initPlayerIframeLink(userState: UserState): void {

    let clearURL: string = this.playerIframeBaseLink + '?';

    if (userState.playerStyles?.logoUrl) {
      clearURL = clearURL + `psb.logoUrl=${userState.playerStyles?.logoUrl}&`;
    }

    if (userState.playerStyles?.tripodCoverLogo) {
      clearURL = clearURL + `psb.tripodCoverLogo=${userState.playerStyles?.tripodCoverLogo}&`;
    }

    if (userState.playerStyles?.mainColor) {
      clearURL = clearURL + `psb.mainColor=%23${rgbToHex(userState.playerStyles?.mainColor?.r, userState.playerStyles?.mainColor?.g, userState.playerStyles?.mainColor?.b)}&`;
    }

    if (userState.playerStyles?.secondaryColor) {
      clearURL = clearURL + `psb.secondaryColor=%23${rgbToHex(userState.playerStyles?.secondaryColor?.r, userState.playerStyles?.secondaryColor?.g, userState.playerStyles?.secondaryColor?.b)}`;
    }

    this.playerIframeLink = this.sanitizer.bypassSecurityTrustResourceUrl(clearURL);
  }

  private setPreviewStyles(onlyColor?: boolean): void {

    if (onlyColor) {
      if (this.previewWatermarkImageURL || this.previewWTripodImageURL) {
        this.setPreviewStyles();
      } else {

        let clearURL: string = this.playerIframeBaseLink + '?';

        if (this.userPlayerStyles.logoUrl) {
          clearURL = clearURL + `psb.logoUrl=${this.userPlayerStyles.logoUrl}&`;
        }

        if (this.userPlayerStyles.tripodCoverLogo) {
          clearURL = clearURL + `psb.tripodCoverLogo=${this.userPlayerStyles.tripodCoverLogo}&`;
        }

        if (this.colorCtrFooter.value && this.colorCtrFooter.value.hex) {
          clearURL = clearURL + `psb.mainColor=%23${this.colorCtrFooter.value.hex}&`;
        } else if (this.colorCtrFooter.value) {
          clearURL = clearURL + `psb.mainColor=%23${this.colorCtrFooter.value.substring(1)}&`;
        }

        if (this.colorCtrFocus.value && this.colorCtrFocus.value.hex) {
          clearURL = clearURL + `psb.secondaryColor=%23${this.colorCtrFocus.value.hex}`;
        } else if (this.colorCtrFocus.value) {
          clearURL = clearURL + `psb.secondaryColor=%23${this.colorCtrFocus.value.substring(1)}`;
        }

        this.saveButtonEnabled = true;
        this.playerIframeLink = this.sanitizer.bypassSecurityTrustResourceUrl(clearURL);
      }

    } else {

      let clearURL: string = this.playerIframeBaseLink + '?';

      if (this.previewWatermarkImageURL) {
        clearURL = clearURL + `psb.logoUrl=${this.previewWatermarkImageURL}&`;
      } else {
        clearURL = clearURL + `psb.logoUrl=${this.userPlayerStyles.logoUrl}&`;
      }

      if (this.previewWTripodImageURL) {
        clearURL = clearURL + `psb.tripodCoverLogo=${this.previewWTripodImageURL}&`;
      } else {
        clearURL = clearURL + `psb.tripodCoverLogo=${this.userPlayerStyles.tripodCoverLogo}&`;
      }

      if (this.colorCtrFooter.value !== this.userPlayerColorHEX) {
        clearURL = clearURL + `psb.mainColor=%23${this.colorCtrFooter.value.hex}&`;
      } else {
        clearURL = clearURL + `psb.mainColor=%23${this.userPlayerColorHEX.substring(1)}&`;
      }

      if (this.colorCtrFocus.value !== this.userPlayerColorHEXSecondary) {
        clearURL = clearURL + `psb.secondaryColor=%23${this.colorCtrFocus.value.hex}`;
      } else {
        clearURL = clearURL + `psb.secondaryColor=%23${this.userPlayerColorHEXSecondary.substring(1)}`;
      }

      this.playerIframeLink = this.sanitizer.bypassSecurityTrustResourceUrl(clearURL);
    }
  }

}
