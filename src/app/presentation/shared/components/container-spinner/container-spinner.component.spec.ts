import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContainerSpinnerComponent } from './container-spinner.component';
import { MockComponent } from 'src/app/utils/utils';

const oldResetTestingModule = TestBed.resetTestingModule;

describe('ContainerSpinnerComponent', () => {
  let comp: ContainerSpinnerComponent;
  let fixture: ComponentFixture<ContainerSpinnerComponent>;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      declarations: [
        ContainerSpinnerComponent,
        MockComponent({
          selector: 'scout24-container-spinner',
          inputs: ['color', 'diameter', 'strokeWidth']
        }),
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

    fixture = TestBed.createComponent(ContainerSpinnerComponent);
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
