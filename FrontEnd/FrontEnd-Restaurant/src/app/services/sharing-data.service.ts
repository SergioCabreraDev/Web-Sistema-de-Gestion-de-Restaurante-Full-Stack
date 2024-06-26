import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _emitterNewUser: EventEmitter<User> = new EventEmitter();

  get emitterNewUser(): EventEmitter<User> {
    return this._emitterNewUser;
  }
}
