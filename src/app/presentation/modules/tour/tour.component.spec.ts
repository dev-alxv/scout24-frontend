import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';

import { TourComponent } from './tour.component';
import { TourManager } from 'src/app/domain/usecase-services/tour-manager';
import { MatDialogMock, MockComponent, mockExposeManager, mockTourManager } from 'src/app/utils/utils';
import { ExposeManager } from 'src/app/domain/usecase-services/expose-manager';

const oldResetTestingModule = TestBed.resetTestingModule;

describe('TourComponent', () => {
  let comp: TourComponent;
  let fixture: ComponentFixture<TourComponent>;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      declarations: [
        TourComponent,
        MockComponent({
          selector: 'scout24-container-spinner',
          inputs: ['loading']
        }),
        MockComponent({
          selector: 'scout24-tour-list-item',
          inputs: ['tour']
        })
      ],
      imports: [
        NgxPaginationModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: TourManager, useValue: mockTourManager },
        { provide: ExposeManager, useValue: mockExposeManager },
        { provide: MatDialog, useValue: MatDialogMock }
      ]
    });

    await TestBed.compileComponents();

    TestBed.resetTestingModule = () => TestBed;
  })().then(done).catch(done.fail));

  beforeEach(() => {

    fixture = TestBed.createComponent(TourComponent);
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
