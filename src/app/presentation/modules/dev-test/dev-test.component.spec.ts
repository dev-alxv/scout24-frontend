import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { DevTestComponent } from './dev-test.component';
import { MockComponent } from 'src/app/utils/utils';
import { UiState } from '../../+store/global/ui-state/ui.state';
import { UiStateStore } from '../../+store/global/ui-state/ui-state.store';
import { DevTestService } from './dev-test.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

const oldResetTestingModule = TestBed.resetTestingModule;

const mockObj: UiState = {
  initialized: false
};

const mockUiStateStore = {
  stateStream$: () => of(mockObj),
};

const mockDevTestService = {
  init: (): void => { },
};

describe('DevTestComponent', () => {
  let comp: DevTestComponent;
  let fixture: ComponentFixture<DevTestComponent>;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    // @UntilDestroy({ checkProperties: true })
    TestBed.configureTestingModule({
      declarations: [
        DevTestComponent,
        // MockComponent({
        //   selector: 'mat-card'
        // }),
      ],
      imports: [],
      providers: [
        // { provide: UiStateStore, useValue: mockUiStateStore },
        { provide: DevTestService, useValue: mockDevTestService },
      ]
    });

    await TestBed.compileComponents();

    TestBed.resetTestingModule = () => TestBed;
  })().then(done).catch(done.fail));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevTestComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    TestBed.resetTestingModule = oldResetTestingModule;
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });
});
