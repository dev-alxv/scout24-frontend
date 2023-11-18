import { inject, TestBed, waitForAsync } from '@angular/core/testing';

import { UserManager } from 'src/app/domain/usecase-services/user-manager';
import { mockUserManager } from 'src/app/utils/utils';

import { UserService } from './user.service';

const oldResetTestingModule = TestBed.resetTestingModule;

describe('UserService', () => {

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: UserManager, useValue: mockUserManager }
      ]
    });

    await TestBed.compileComponents();

    TestBed.resetTestingModule = () => TestBed;
  })().then(done).catch(done.fail));

  beforeEach(() => {

  });

  afterEach(waitForAsync(() => {
    // component.ngOnDestroy();
  }));

  afterAll(() => {
    TestBed.resetTestingModule = oldResetTestingModule;
    TestBed.resetTestingModule();
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
