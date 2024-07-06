import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserServicesService } from '../../../services/user-services.service';

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
    private service: UserServicesService
  ) {}
  
  ngOnInit(): void {
    this.reviews=this.service.findAllReviews();
  }



}
