import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

import { TourListItemComponent } from './tour-list-item.component';
import { MatDialogMock, tourMock } from 'src/app/utils/utils';

const oldResetTestingModule = TestBed.resetTestingModule;

describe('TourListItemComponent', () => {
  let comp: TourListItemComponent;
  let fixture: ComponentFixture<TourListItemComponent>;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      declarations: [
        TourListItemComponent
      ],
      imports: [
        MatMenuModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: MatDialog, useValue: MatDialogMock }
      ]
    });

    await TestBed.compileComponents();

    TestBed.resetTestingModule = () => TestBed;
  })().then(done).catch(done.fail));

  beforeEach(() => {

    fixture = TestBed.createComponent(TourListItemComponent);
    comp = fixture.componentInstance;
    comp.tour = tourMock;

    fixture.detectChanges();

  });

  afterEach(waitForAsync(() => {
    // component.ngOnDestroy();
  }));

  afterAll(() => {
    TestBed.resetTestingModule = oldResetTestingModule;
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });
});
