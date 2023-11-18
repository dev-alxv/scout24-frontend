import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { SideComponent } from './side.component';
import { MatDialogMock, MockComponent, mockTourManager } from 'src/app/utils/utils';
import { TourManager } from 'src/app/domain/usecase-services/tour-manager';

const oldResetTestingModule = TestBed.resetTestingModule;

describe('SideComponent', () => {
  let comp: SideComponent;
  let fixture: ComponentFixture<SideComponent>;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      declarations: [
        SideComponent,
        MockComponent({
          selector: 'mat-form-field'
        }),
        MockComponent({
          selector: 'mat-label'
        }),
        MockComponent({
          selector: 'mat-icon'
        }),
        MockComponent({
          selector: 'mat-select'
        }),
        MockComponent({
          selector: 'mat-option'
        })
      ],
      imports: [
        TranslateModule.forRoot(),
        FormsModule
      ],
      providers: [
        { provide: TourManager, useValue: mockTourManager },
        { provide: MatDialog, useValue: MatDialogMock }
      ]
    });

    await TestBed.compileComponents();

    TestBed.resetTestingModule = () => TestBed;
  })().then(done).catch(done.fail));

  beforeEach(() => {

    fixture = TestBed.createComponent(SideComponent);
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
