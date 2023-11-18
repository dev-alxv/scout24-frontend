import { HttpClient } from '@angular/common/http';
import { Component, Directive } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ModalTemplateInputData } from '../domain/interfaces/modal/modal.interfaces';
import { Expose } from '../domain/models/expose/expose.model';
import { Tour } from '../domain/models/Tour/tour.model';
import { ExposeManager } from '../domain/usecase-services/expose-manager';
import { TourManager } from '../domain/usecase-services/tour-manager';
import { UserManager } from '../domain/usecase-services/user-manager';
import { TourService } from '../presentation/+store/+services/tour/tour.service';
import { UserService } from '../presentation/+store/+services/user/user.service';

// Check for object property
export function isDefined(item: any): boolean {
  return item !== undefined && item !== null;
}

// Observable timeout
export function doAsyncTask(time: number): Observable<string> {
  return of('done').pipe(
    delay(time)
  );
}

// Deep copy an object to break the reference
export function deepCopy<T>(obj: any): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

// *********************
// Unit tests helpers
// *********************
export function MockDirective(options: Component): Directive {
  const metadata: Directive = {
    selector: options.selector,
    inputs: options.inputs,
    outputs: options.outputs
  };
  return Directive(metadata)(class { }) as any;
}

export function MockComponent(options: Component): Component {
  const metadata: Component = {
    selector: options.selector,
    template: options.template || '<div></div>',
    inputs: options.inputs,
    outputs: options.outputs
  };
  return Component(metadata)(class { }) as any;
}

// MOCKS

export const mockHttpClient: HttpClient = <HttpClient>{

};

export const mockTourService: TourService = <TourService>{
  init: (): void => { }
};

export const mockUserService: UserService = <UserService>{
  init: (): void => { }
};

export const mockUserManager: UserManager = <UserManager>{
  getContract: () => of({})
};

export const mockTourManager: TourManager = <TourManager>{
  list: ({ }) => of({})
};

export const mockExposeManager: ExposeManager = <ExposeManager>{
  list: () => of({})
};

export const MatDialogMock = {
  open() {
    return {
      afterClosed: () => of(true)
    };
  }
}

export const tourMock: Tour = <Tour>{
  name: 'Mocked Tour Object',
  ids: {
    agent: '',
    external: '',
    internal: '',
    item: '',
    main: ''
  },
  dashboardLinks: {
    deleteItem: '',
    downloadPanoramas: '',
    editTour: '',
    fpZipImages: '',
    tourPlayer: ''
  },
  floorPlans: {
    dollhouseOrdered: true,
    dollhousePublished: true,
    id: '',
    internalID: "1000006",
    status: "APPROVED"
  },
  mainImagePaths: {
    AI: '',
    editorCopy: '',
    full: '',
    hd1080: '',
    hd2048: '',
    hd2688: '',
    original: '',
    small: ''
  }
}

export const exposeMock: Expose = <Expose>{
  title: 'Mocked Expose Object',
  ids: {
    objectID: '098776',
    externalID: '12345'
  },
  image: {
    className: '',
    hash: '',
    isFloorPlan: false,
    urlPath: ''
  }
}

export const mockInjectionData: ModalTemplateInputData = <ModalTemplateInputData>{
  modalTitle: 'Mocked Modal Injection Data',
  inputs: {
    tour: tourMock,
    internalID: '12345'
  }
};

// *********************
// *********************
