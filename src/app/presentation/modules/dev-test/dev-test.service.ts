import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DevTestService {

  constructor() {
  }

  public init(): void {
    console.log('TESTING SERVICE');
  }
}
