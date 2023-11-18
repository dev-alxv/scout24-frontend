import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { PaymentInfosDialogComponent } from './payment-infos-dialog.component';

const oldResetTestingModule = TestBed.resetTestingModule;

describe('PaymentInfosDialogComponent', () => {
  let comp: PaymentInfosDialogComponent;
  let fixture: ComponentFixture<PaymentInfosDialogComponent>;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      declarations: [
        PaymentInfosDialogComponent
      ],
      imports: [
        TranslateModule.forRoot()
      ],
      providers: [

      ]
    });

    await TestBed.compileComponents();

    TestBed.resetTestingModule = () => TestBed;
  })().then(done).catch(done.fail));

  beforeEach(() => {

    fixture = TestBed.createComponent(PaymentInfosDialogComponent);
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
