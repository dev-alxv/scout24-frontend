// import {Clipboard} from '@angular/cdk/clipboard';
import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import { Clipboard } from '@angular/cdk/clipboard';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ModalTemplateInputData } from 'src/app/domain/interfaces/modal/modal.interfaces';


@Component({
  selector: 'scout24-tour-embed-dialog',
  templateUrl: './tour-embed-dialog.component.html',
  styleUrls: ['./tour-embed-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TourEmbedDialogComponent {

  public exampleURL = 'https://www.immobilienscout24.de/anbieten/gewerbliche-anbieter/lp/virtuelle-touren-embed-code.html';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalTemplateInputData,
    private dialogRef: MatDialog,
    private clipboard: Clipboard
  ) { }

  public embedTourLinkIsCopied = false;

  @ViewChild(MatTabGroup) public tab: MatTabGroup;


  public embedCodeiFrame = `<div style='max-width: 100%; padding-bottom: 56.25%; position: relative; height: 0; overflow: hidden;'>
  \n\t<iframe webkitAllowFullScreen mozallowfullscreen allowFullScreen frameborder='0' id='iframeTour-${this.data.inputs.internalID}' style='position: absolute; top: 0; left:0; width: 100%; height:100%' src='${environment.portalBaseUrl}/tour/${this.data.inputs.internalID}'></iframe>\n
  </div>`;

  public embedCodeJs = `<script type='text/javascript' src='${environment.portalBaseUrl}/assets/javascripts/embedcode-utils.js'></script>
  \n<a id='${this.data.inputs.internalID}' attr-identity='${this.data.inputs.userID}' attr-internalID='${this.data.inputs.internalID} class='iframe embed-container' style='display : inline-block;'><canvas width='400' height='200'></canvas></a>`;

  public cancel(): void {
    this.dialogRef.closeAll();
    this.embedTourLinkIsCopied = false;
  }

  public copy(): void {
    const copy =
      this.tab.selectedIndex === 0 ? this.embedCodeJs : this.embedCodeiFrame;
    this.clipboard.copy(copy);
    this.embedTourLinkIsCopied = true;

  }

  public watchExample() {
    // TODO: Example Missing
  }
}


