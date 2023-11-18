import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { ExposeListItemComponent } from './expose-list-item.component';
import { exposeMock } from 'src/app/utils/utils';

const oldResetTestingModule = TestBed.resetTestingModule;

describe('ExposeListItemComponent', () => {
  let comp: ExposeListItemComponent;
  let fixture: ComponentFixture<ExposeListItemComponent>;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      declarations: [
        ExposeListItemComponent
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

    fixture = TestBed.createComponent(ExposeListItemComponent);
    comp = fixture.componentInstance;
    comp.expose = exposeMock;

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
