import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { ScoutBrandingDialogComponent } from './scout-branding-dialog.component';
import { MatDialogMock, MockComponent, mockInjectionData, mockUserManager } from 'src/app/utils/utils';
import { UserManager } from 'src/app/domain/usecase-services/user-manager';

const oldResetTestingModule = TestBed.resetTestingModule;

describe('ScoutBrandingDialogComponent', () => {
  let comp: ScoutBrandingDialogComponent;
  let fixture: ComponentFixture<ScoutBrandingDialogComponent>;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      declarations: [
        ScoutBrandingDialogComponent,
        MockComponent({
          selector: 'scout24-container-spinner',
          inputs: ['loading']
        }),
      ],
      imports: [
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: MatDialog, useValue: MatDialogMock },
        { provide: MAT_DIALOG_DATA, useValue: mockInjectionData },
        { provide: UserManager, useValue: mockUserManager },
      ]
    });

    await TestBed.compileComponents();

    TestBed.resetTestingModule = () => TestBed;
  })().then(done).catch(done.fail));

  beforeEach(() => {

    fixture = TestBed.createComponent(ScoutBrandingDialogComponent);
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
