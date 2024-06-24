import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  constructor() { }
  private _emitterShowModal: EventEmitter<any> = new EventEmitter();

  emitterShowModal(): any{
    return this._emitterShowModal;
  }
}
