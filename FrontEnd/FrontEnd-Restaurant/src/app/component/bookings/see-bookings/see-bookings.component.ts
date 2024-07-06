import { Component, OnInit } from '@angular/core';
import { Booking } from '../../../models/Booking';
import { CommonModule } from '@angular/common';
import { BookingsServicesService } from '../../../services/bookings-services.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-see-bookings',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './see-bookings.component.html',
  styleUrls: ['./see-bookings.component.css']
})
export class SeeBookingsComponent implements OnInit {

  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  today: string;
  valueInputDate: string;

  constructor(private service: BookingsServicesService) {
    const todayDate = new Date();
    const day = String(todayDate.getDate()).padStart(2, '0');
    const month = String(todayDate.getMonth() + 1).padStart(2, '0');
    const year = todayDate.getFullYear();
    this.today = `${year}-${month}-${day}`;
    this.valueInputDate = this.today;
  }

  // Método que se ejecuta una vez que el componente ha sido inicializado
  ngOnInit(): void {
    // Llamar al servicio para obtener todas las reservas
    this.service.findAllBookings().subscribe(
      (data: Booking[]) => {
        // Asignar los datos obtenidos a la variable bookings
        this.bookings = data;
        
        // Filtrar las reservas para la fecha seleccionada
        this.filterBookings();
      },
      (error) => {
        // Manejar cualquier error que ocurra al obtener las reservas
        console.error('Error fetching bookings', error);
      }
    );
  }

  // Método para filtrar las reservas por la fecha seleccionada
  filterBookings(): void {
    // Crear un objeto de fecha a partir de la fecha seleccionada
    const selectedDate = new Date(this.valueInputDate);
    
    // Filtrar las reservas para incluir solo las que coincidan con la fecha seleccionada
    this.filteredBookings = this.bookings.filter(item => {
      // Crear un objeto de fecha a partir de la fecha de la reserva
      const bookingDate = new Date(item.date);
      
      // Comparar las fechas ignorando las diferencias de tiempo
      return bookingDate.toDateString() === selectedDate.toDateString();
    });
  }
}
