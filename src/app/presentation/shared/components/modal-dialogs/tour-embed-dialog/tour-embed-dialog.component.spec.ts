import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { TourEmbedDialogComponent } from './tour-embed-dialog.component';
import { MatDialogMock, mockInjectionData } from 'src/app/utils/utils';

const oldResetTestingModule = TestBed.resetTestingModule;

describe('TourEmbedDialogComponent', () => {
  let comp: TourEmbedDialogComponent;
  let fixture: ComponentFixture<TourEmbedDialogComponent>;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      declarations: [
        TourEmbedDialogComponent
      ],
      imports: [
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: MatDialog, useValue: MatDialogMock },
        { provide: MAT_DIALOG_DATA, useValue: mockInjectionData }
      ]
    });

    await TestBed.compileComponents();

    TestBed.resetTestingModule = () => TestBed;
  })().then(done).catch(done.fail));

  beforeEach(() => {

    fixture = TestBed.createComponent(TourEmbedDialogComponent);
    comp = fixture.componentInstance;
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
