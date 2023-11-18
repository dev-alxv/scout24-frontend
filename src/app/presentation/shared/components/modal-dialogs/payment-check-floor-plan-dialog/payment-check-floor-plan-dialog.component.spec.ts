import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { PaymentCheckFloorPlanDialogComponent } from './payment-check-floor-plan-dialog.component';
import { MatDialogMock, MockComponent, mockInjectionData, mockTourManager } from 'src/app/utils/utils';
import { TourManager } from 'src/app/domain/usecase-services/tour-manager';

const oldResetTestingModule = TestBed.resetTestingModule;

describe('PaymentCheckFloorPlanDialogComponent', () => {
  let comp: PaymentCheckFloorPlanDialogComponent;
  let fixture: ComponentFixture<PaymentCheckFloorPlanDialogComponent>;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      declarations: [
        PaymentCheckFloorPlanDialogComponent,
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
        { provide: MAT_DIALOG_DATA, useValue: mockInjectionData },
        { provide: TourManager, useValue: mockTourManager },
      ]
    });

    await TestBed.compileComponents();

    TestBed.resetTestingModule = () => TestBed;
  })().then(done).catch(done.fail));

  beforeEach(() => {

    fixture = TestBed.createComponent(PaymentCheckFloorPlanDialogComponent);
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
