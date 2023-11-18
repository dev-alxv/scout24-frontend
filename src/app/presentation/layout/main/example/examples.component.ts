import { Component, OnInit } from '@angular/core';
import { DialogTemplateComponent } from 'src/app/presentation/shared/templates/dialog/dialog-template.component';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BaseHostModalDialogComponent } from 'src/app/presentation/shared/components/base-host-modal-dialog/base-host-modal-dialog.component';
import { ExposeListDialogComponent } from 'src/app/presentation/shared/components/modal-dialogs/expose-list-dialog/expose-list-dialog.component';
import { ModalTemplateInputData } from 'src/app/domain/interfaces/modal/modal.interfaces';
@Component({
  selector: 'scout24-example',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss']
})
export class ExamplesComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public openDialogOne() {

    const dialogRef = this.dialog.open(DialogTemplateComponent, {
      data: {
        component: ModalExampleOneComponent,
        title: 'Möchten sie ihre tour wirklich löschen ?',
        closeButton: true,
        cancelButton: true,
        actionButtonTwo: 'Bestätigen',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public openDialogTwo() {

    const dialogRef = this.dialog.open(DialogTemplateComponent, {
      data: {
        title: 'Tour in Webseite einbetten',
        closeButton: true,
        cancelButton: true,
        actionButtonOne: 'Beispiel ansehen',
        actionButtonTwo: 'Code kopieren',
      },
      width: '800px',
      height: '400px'
    });
  }

  public openDialogThree() {

    const dialogRef = this.dialog.open(DialogTemplateComponent, {
      data: {
        title: '',
        component: ModalExampleTwoComponent,
        closeButton: false,
        cancelButton: '',
        actionButtonOne: '',
        actionButtonTwo: '',
      },
      width: '400px',
      height: '250px'
    });
  }

  public openDialogFour() {
    const dialogRef = this.dialog.open(BaseHostModalDialogComponent, {
      panelClass: '', // class for this dialog
      data: new ModalTemplateInputData({
        modalTitle: 'Modal title',
        controlActions: true,
        logo: false,
        component: ExposeListDialogComponent, //--> here component to load
        inputs: { // here an object with inputs data needed by your hosted component
          text: 'This is an input from BadgeComponent'
        },
      }),
      width: '800px',
      height: '400px'
    })
  }


}

@Component({
  selector: 'scout24-modal-example-one',
  template: `
  <div>Demo</div>`
})
export class ModalExampleOneComponent {

}

@Component({
  selector: 'scout24-modal-example-two',
  template: `
  <div>
  <mat-spinner></mat-spinner>

</div>`
})
export class ModalExampleTwoComponent {

}

