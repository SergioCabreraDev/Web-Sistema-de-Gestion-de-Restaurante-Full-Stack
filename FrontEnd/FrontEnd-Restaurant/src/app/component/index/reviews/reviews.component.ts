import { Component, OnInit } from '@angular/core';
import { RestauranteServiceService } from '../../../services/restaurante-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {

  reviews: any[] = []

  constructor(
    private service: RestauranteServiceService
  ) {}
  
  ngOnInit(): void {
    this.reviews=this.service.findAllReviews();
  }



}
