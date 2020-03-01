import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  public static delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
