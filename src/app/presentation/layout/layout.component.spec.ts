import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { MockComponent } from 'src/app/utils/utils';

const oldResetTestingModule = TestBed.resetTestingModule;

describe('LayoutComponent', () => {
  let comp: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      declarations: [
        LayoutComponent,
        MockComponent({
          selector: 'scout24-header'
        }),
        MockComponent({
          selector: 'scout24-main'
        }),
        MockComponent({
          selector: 'scout24-side'
        }),
        MockComponent({
          selector: 'scout24-footer'
        })
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

    fixture = TestBed.createComponent(LayoutComponent);
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
