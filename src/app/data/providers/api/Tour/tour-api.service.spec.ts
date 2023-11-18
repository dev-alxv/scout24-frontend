import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { TourApiService } from './tour-api.service';
import { mockHttpClient } from 'src/app/utils/utils';

const oldResetTestingModule = TestBed.resetTestingModule;

describe('TourApiService', () => {

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      providers: [
        TourApiService,
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

  it('should be created', inject([TourApiService], (service: TourApiService) => {
    expect(service).toBeTruthy();
  }));
});
