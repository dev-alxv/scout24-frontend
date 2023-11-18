import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { TourService } from './tour.service';
import { TourManager } from 'src/app/domain/usecase-services/tour-manager';
import { mockTourManager, mockTourService } from 'src/app/utils/utils';

const oldResetTestingModule = TestBed.resetTestingModule;

const mockTourManagerNotEmpty: TourManager = <TourManager>{
  list: ({ }) => of({
    tourCollection: [{
      name: 'Test'
    }]
  })
};

describe('TourService', () => {

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      providers: [
        { provide: TourService, useValue: mockTourService },
        { provide: TourManager, useValue: mockTourManagerNotEmpty }
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

  it('should be created', inject([TourService], (service: TourService) => {
    service.init();
    expect(service).toBeTruthy();
  }));

});
