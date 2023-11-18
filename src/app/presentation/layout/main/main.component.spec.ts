import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { MainComponent } from './main.component';
import { MatDialogMock, MockComponent } from 'src/app/utils/utils';

const oldResetTestingModule = TestBed.resetTestingModule;

describe('MainComponent', () => {
  let comp: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        MockComponent({
          selector: 'scout24-tour'
        })
      ],
      imports: [

      ],
      providers: [
        { provide: MatDialog, useValue: MatDialogMock }
      ]
    });

    await TestBed.compileComponents();

    TestBed.resetTestingModule = () => TestBed;
  })().then(done).catch(done.fail));

  beforeEach(() => {

    fixture = TestBed.createComponent(MainComponent);
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
