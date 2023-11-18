import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';

import { ExposeComponent } from './expose.component';
import { ExposeManager } from 'src/app/domain/usecase-services/expose-manager';
import { MatDialogMock, MockComponent, mockExposeManager } from 'src/app/utils/utils';

const oldResetTestingModule = TestBed.resetTestingModule;

describe('ExposeComponent', () => {
  let comp: ExposeComponent;
  let fixture: ComponentFixture<ExposeComponent>;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      declarations: [
        ExposeComponent,
        MockComponent({
          selector: 'scout24-container-spinner',
          inputs: ['loading']
        }),
        MockComponent({
          selector: 'scout24-expose-list-item',
          inputs: ['expose']
        })
      ],
      imports: [
        NgxPaginationModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ExposeManager, useValue: mockExposeManager },
        { provide: MatDialog, useValue: MatDialogMock }
      ]
    });

    await TestBed.compileComponents();

    TestBed.resetTestingModule = () => TestBed;
  })().then(done).catch(done.fail));

  beforeEach(() => {

    fixture = TestBed.createComponent(ExposeComponent);
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
