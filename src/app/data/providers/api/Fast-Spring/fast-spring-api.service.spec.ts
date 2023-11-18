import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { FastSpringApiService } from './fast-spring-api.service';
import { mockHttpClient } from 'src/app/utils/utils';

const oldResetTestingModule = TestBed.resetTestingModule;

describe('FastSpringApiService', () => {

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      providers: [
        FastSpringApiService,
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

  it('should be created', inject([FastSpringApiService], (service: FastSpringApiService) => {
    expect(service).toBeTruthy();
  }));
});
