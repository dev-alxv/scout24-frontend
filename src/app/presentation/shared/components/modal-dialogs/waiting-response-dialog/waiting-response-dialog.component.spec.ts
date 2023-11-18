import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { WaitingResponseDialogComponent } from './waiting-response-dialog.component';

const oldResetTestingModule = TestBed.resetTestingModule;

describe('WaitingResponseDialogComponent', () => {
  let comp: WaitingResponseDialogComponent;
  let fixture: ComponentFixture<WaitingResponseDialogComponent>;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      declarations: [
        WaitingResponseDialogComponent,
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

    fixture = TestBed.createComponent(WaitingResponseDialogComponent);
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
