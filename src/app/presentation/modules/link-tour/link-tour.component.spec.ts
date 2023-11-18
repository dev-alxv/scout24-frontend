import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { ExposeManager } from 'src/app/domain/usecase-services/expose-manager';
import { TourManager } from 'src/app/domain/usecase-services/tour-manager';
import { MatDialogMock, MockComponent, mockExposeManager, mockTourManager } from 'src/app/utils/utils';
import { routes } from './link-tour-routing.module';
import { LinkTourComponent } from './link-tour.component';

const oldResetTestingModule = TestBed.resetTestingModule;

describe('LinkTourComponent', () => {
  let component: LinkTourComponent;
  let fixture: ComponentFixture<LinkTourComponent>;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      declarations: [
        LinkTourComponent,
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
        TranslateModule.forRoot(),

        RouterTestingModule,
        RouterModule.forRoot(routes),
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


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkTourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    TestBed.resetTestingModule = oldResetTestingModule;
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
