import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ModalTemplateInputData } from 'src/app/domain/interfaces/modal/modal.interfaces';

@Component({
  selector: 'scout24-expose-list-dialog',
  templateUrl: './expose-list-dialog.component.html',
  styleUrls: ['./expose-list-dialog.component.scss']
})
export class ExposeListDialogComponent implements OnInit {

  @Output() public linkExposeEvent: EventEmitter<{ exposeObjectId: string }> = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalTemplateInputData
  ) { }

  public ngOnInit(): void {
  }

  public linkExpose(id: { exposeObjectId: string }): void {
    this.linkExposeEvent.emit(id);
  }

}
