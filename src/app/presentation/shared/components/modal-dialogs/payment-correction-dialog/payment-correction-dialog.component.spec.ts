import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';

import { PaymentCorrectionDialogComponent } from './payment-correction-dialog.component';
import { TourManager } from 'src/app/domain/usecase-services/tour-manager';
import { MatDialogMock, MockComponent, mockTourManager } from 'src/app/utils/utils';

const oldResetTestingModule = TestBed.resetTestingModule;

describe('PaymentCorrectionDialogComponent', () => {
  let comp: PaymentCorrectionDialogComponent;
  let fixture: ComponentFixture<PaymentCorrectionDialogComponent>;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      declarations: [
        PaymentCorrectionDialogComponent,
        MockComponent({
          selector: 'scout24-container-spinner',
          inputs: ['loading']
        }),
      ],
      imports: [
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: MatDialog, useValue: MatDialogMock },
        { provide: TourManager, useValue: mockTourManager }
      ]
    });

    await TestBed.compileComponents();

    TestBed.resetTestingModule = () => TestBed;
  })().then(done).catch(done.fail));

  beforeEach(() => {

    fixture = TestBed.createComponent(PaymentCorrectionDialogComponent);
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
