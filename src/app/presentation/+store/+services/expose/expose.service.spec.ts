import { inject, TestBed, waitForAsync } from '@angular/core/testing';

import { ExposeService } from './expose.service';
import { ExposeManager } from 'src/app/domain/usecase-services/expose-manager';
import { mockExposeManager } from 'src/app/utils/utils';

const oldResetTestingModule = TestBed.resetTestingModule;

describe('ExposeService', () => {

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      providers: [
        ExposeService,
        { provide: ExposeManager, useValue: mockExposeManager }
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

  it('should be created', inject([ExposeService], (service: ExposeService) => {
    expect(service).toBeTruthy();
  }));
});
