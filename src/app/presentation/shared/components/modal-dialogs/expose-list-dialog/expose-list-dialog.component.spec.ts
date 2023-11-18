import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { ExposeListDialogComponent } from './expose-list-dialog.component';
import { MatDialogMock, MockComponent, mockInjectionData } from 'src/app/utils/utils';

const oldResetTestingModule = TestBed.resetTestingModule;

describe('ExposeListDialogComponent', () => {
  let comp: ExposeListDialogComponent;
  let fixture: ComponentFixture<ExposeListDialogComponent>;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      declarations: [
        ExposeListDialogComponent,
        MockComponent({
          selector: 'scout24-expose'
        })
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

    fixture = TestBed.createComponent(ExposeListDialogComponent);
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
