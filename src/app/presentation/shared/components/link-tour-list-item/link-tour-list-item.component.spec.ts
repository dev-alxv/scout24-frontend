import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { LinkTourListItemComponent } from './link-tour-list-item.component';
import { MatDialogMock, tourMock } from 'src/app/utils/utils';

const oldResetTestingModule = TestBed.resetTestingModule;

describe('LinkTourListItemComponent', () => {
  let component: LinkTourListItemComponent;
  let fixture: ComponentFixture<LinkTourListItemComponent>;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      declarations: [
        LinkTourListItemComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        MatDialogModule
      ],
      providers: [
        { provide: MatDialog, useValue: MatDialogMock }
      ]
    });

    await TestBed.compileComponents();

    TestBed.resetTestingModule = () => TestBed;
  })().then(done).catch(done.fail));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkTourListItemComponent);
    component = fixture.componentInstance;
    component.tour = tourMock;
    fixture.detectChanges();
  });

  afterAll(() => {
    TestBed.resetTestingModule = oldResetTestingModule;
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
