import { Injectable } from '@angular/core';
import { reviews } from '../data/index-reviews';

@Injectable({
  providedIn: 'root'
})
export class RestauranteServiceService {

  constructor() { }

  findAllReviews(): any[]{
    return reviews;
  }
}
