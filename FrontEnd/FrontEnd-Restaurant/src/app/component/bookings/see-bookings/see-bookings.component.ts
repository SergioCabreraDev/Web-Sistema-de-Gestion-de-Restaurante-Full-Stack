import { Component, OnInit } from '@angular/core';
import { Booking } from '../../../models/Booking';
import { CommonModule } from '@angular/common';
import { BookingsServicesService } from '../../../services/bookings-services.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/User';
import Swal from 'sweetalert2';

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
  user!: User;

  constructor(private service: BookingsServicesService, private authService: AuthService) {
    const todayDate = new Date();
    const day = String(todayDate.getDate()).padStart(2, '0');
    const month = String(todayDate.getMonth() + 1).padStart(2, '0');
    const year = todayDate.getFullYear();
    this.today = `${year}-${month}-${day}`;
    this.valueInputDate = this.today;
  }

  ngOnInit(): void {
    this.service.findAllBookings().subscribe(
      (data: Booking[]) => {
        this.bookings = data;
        this.filterBookings();
        this.deletePastBookings();
      },
      (error) => {
        console.error('Error fetching bookings', error);
      }
    );
  }

  filterBookings(): void {
    const selectedDate = new Date(this.valueInputDate);

    this.filteredBookings = this.bookings.filter(item => {
      const bookingDate = new Date(item.date);
      return bookingDate.toDateString() === selectedDate.toDateString();
    });
  }

  deleteBookingById(id: number){
    Swal.fire({
      title: "¿Estas Seguro?",
      text: "¿Quieres eliminar la reserva?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.remove(id).subscribe(
          () => {
            // Remover la reserva eliminada de las listas bookings y filteredBookings
            this.bookings = this.bookings.filter(item => item.id !== id);
            this.filteredBookings = this.filteredBookings.filter(item => item.id !== id);
    
            console.warn("La reserva con id ("+ id + ") ha sido borrada")
          },
          (error) => {
            console.error(`Error deleting booking with id ${id}`, error);
          }
        );
        Swal.fire({
          title: "Eliminada!",
          text: "La reserva ha sido eliminada.",
          icon: "success"
        });
      }
    });
    
  }

  deletePastBookings() {
    const now = new Date(); // Obtener la fecha y hora actuales
    now.setHours(0, 0, 0, 0); // Establecer horas, minutos, segundos y milisegundos a cero
  
    for (const val of this.bookings) {
      const bookingDate = new Date(val.date);
      bookingDate.setHours(0, 0, 0, 0); // Establecer horas, minutos, segundos y milisegundos a cero
  
      // Verificar si la fecha de la reserva es anterior a la fecha actual (sin considerar la hora)
      if (bookingDate.getTime() < now.getTime()) {
        // Eliminar reserva
        this.service.remove(val.id).subscribe(
          () => {
            // Remover la reserva eliminada de las listas bookings y filteredBookings
            this.bookings = this.bookings.filter(item => item.id !== val.id);
            this.filteredBookings = this.filteredBookings.filter(item => item.id !== val.id);
            console.warn("La reserva con id ("+ val.id + ") ha sido borrada")
          },
          (error) => {
            console.error(`Error deleting booking with id ${val.id}`, error);
          }
        );
      }
    }
  }
  
  
  
}
