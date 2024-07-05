import { Component, OnInit } from '@angular/core';
import { Booking } from '../../../models/Booking';
import { RestauranteServiceService } from '../../../services/restaurante-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-see-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './see-bookings.component.html',
  styleUrl: './see-bookings.component.css'
})
export class SeeBookingsComponent implements OnInit {

  bookings: Booking[] = [];

  constructor(
    private service: RestauranteServiceService
  ){
    
  }
  ngOnInit(): void {
    this.service.findAllBookings().subscribe((data: Booking[]) => {
      this.bookings = data;
    }, (error) => {
      console.error('Error fetching bookings', error);
    });
  }

}
