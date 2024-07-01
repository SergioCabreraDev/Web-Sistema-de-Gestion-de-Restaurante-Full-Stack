import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Booking } from '../../models/Booking';


@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent implements OnInit {


  booking!: Booking;

 constructor(){
  this.booking = new Booking(); // Inicializa un nuevo usuario
 }

onSubmit(arg0: any) {
throw new Error('Method not implemented.');
}
  ngOnInit(): void {
    this.generarHoras();
  }
  horas: string[] = [];

  generarHoras() {
    const startHour = 12;
    const endHour = 23;
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const hora = hour.toString().padStart(2, '0');
        const min = minute.toString().padStart(2, '0');
        this.horas.push(`${hora}:${min}`);
      }}}
    
}
