import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { UserApiService } from './user-api.service';
import { mockHttpClient } from 'src/app/utils/utils';

const oldResetTestingModule = TestBed.resetTestingModule;

describe('UserApiService', () => {

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      providers: [
        UserApiService,
        { provide: HttpClient, useValue: mockHttpClient }
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

  it('should be created', inject([UserApiService], (service: UserApiService) => {
    expect(service).toBeTruthy();
  }));
});
