import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActionDialogComponent } from './action-dialog.component';

const oldResetTestingModule = TestBed.resetTestingModule;

describe('ActionDialogComponent', () => {
  let comp: ActionDialogComponent;
  let fixture: ComponentFixture<ActionDialogComponent>;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      declarations: [
        ActionDialogComponent
      ],
      imports: [

      ],
      providers: [

      ]
    });

    await TestBed.compileComponents();

    TestBed.resetTestingModule = () => TestBed;
  })().then(done).catch(done.fail));

  beforeEach(() => {

    fixture = TestBed.createComponent(ActionDialogComponent);
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
