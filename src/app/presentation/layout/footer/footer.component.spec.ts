import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent } from './footer.component';

const oldResetTestingModule = TestBed.resetTestingModule;

describe('FooterComponent', () => {
  let comp: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      declarations: [
        FooterComponent
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

    fixture = TestBed.createComponent(FooterComponent);
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
