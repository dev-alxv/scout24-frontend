import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Expose } from 'src/app/domain/models/expose/expose.model';

@Component({
  selector: 'scout24-expose-list-item',
  templateUrl: './expose-list-item.component.html',
  styleUrls: ['./expose-list-item.component.scss']
})
export class ExposeListItemComponent implements OnInit {

  public defaultImage = 'assets/img/no_image.png';

  @Input() public expose: Expose;

  @Output() public linkExposeEvent: EventEmitter<{ exposeObjectId: string }> = new EventEmitter();

  constructor(

  ) { }

  public ngOnInit(): void {
  }

  public linkExposeToTour(): void {
    this.linkExposeEvent.emit({
      exposeObjectId: this.expose.ids.objectID
    });
  }

}
