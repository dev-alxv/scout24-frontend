import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';

import { MockComponent, mockExposeManager, mockHttpClient, mockTourManager, mockTourService, mockUserManager, mockUserService } from './utils/utils';
import { UserService } from './presentation/+store/+services/user/user.service';
import { UserManager } from './domain/usecase-services/user-manager';
import { TourManager } from './domain/usecase-services/tour-manager';
import { ExposeManager } from './domain/usecase-services/expose-manager';
import { routes } from './app-routing.module';
import { TourService } from './presentation/+store/+services/tour/tour.service';

const oldResetTestingModule = TestBed.resetTestingModule;

// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: '',
//     pathMatch: 'full'
//   }
// ];

describe('AppComponent', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent({
          selector: 'scout24-layout'
        }),
      ],
      imports: [
        RouterModule.forRoot(routes),
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: TourService, useValue: mockTourService },
        { provide: UserService, useValue: mockUserService },
        { provide: UserManager, useValue: mockUserManager },
        { provide: TourManager, useValue: mockTourManager },
        { provide: ExposeManager, useValue: mockExposeManager }
      ]
    });

    await TestBed.compileComponents();

    TestBed.resetTestingModule = () => TestBed;
  })().then(done).catch(done.fail));

  beforeEach(() => {

    fixture = TestBed.createComponent(AppComponent);
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

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ImmobilienScout24'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ImmobilienScout24');
  });
});
