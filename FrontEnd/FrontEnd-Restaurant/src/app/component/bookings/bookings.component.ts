import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Booking } from '../../models/Booking';
import Swal from 'sweetalert2';
import { BookingsServicesService } from '../../services/bookings-services.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent implements OnInit {


  booking: Booking;
  today: string;
  horas: string[] = [];
  errorMessage!: string;

  constructor(
    private service: BookingsServicesService
  
  ) {
    this.booking = new Booking();
    const todayDate = new Date();
    const day = String(todayDate.getDate()).padStart(2, '0');
    const month = String(todayDate.getMonth() + 1).padStart(2, '0');
    const year = todayDate.getFullYear();
    this.today = `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    this.generarHoras(new Date());
  }

  onSubmit(itemForm: NgForm) {
  
    if (itemForm.valid) {
      console.log(this.booking)
      // this.sharingData.emitterNewUser.emit(this.user)
      this.errorMessage = ""; 
      this.createBooking(itemForm)
      // Resetea el formulario
      itemForm.reset();
      itemForm.resetForm();

    }
  
  }

  createBooking(itemForm:NgForm) {
    this.service.createBooking(this.booking).subscribe(
      response => {
        // Operación de creación exitosa, puedes redirigir a otra página, mostrar un mensaje de éxito, etc.
        console.log('Usuario creado:', response);
        
          Swal.fire({
            icon: "success",
            title: "El Registro Se Ha Completado",
            showConfirmButton: false,
            timer: 1500
          });
      



      },
      error => {
        Swal.fire({
          icon: "error",
          title: error,
          text: "Ingresa otro Usuario o Telefono"
        });
        this.errorMessage = error; // Asigna el mensaje de error para mostrar en tu plantilla
      }
    );
  }


  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      const selectedDate = new Date(input.value);
      this.generarHoras(selectedDate);
    }
  }

  generarHoras(selectedDate: Date): void {
    const startHour = 12;
    const endHour = 23;
    this.horas = []; // Reinicia el array de horas

    const today = new Date();
    const isToday = selectedDate.toDateString() === today.toDateString();

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        if (isToday) {
          const currentTime = today.getHours() + today.getMinutes() / 60;
          const selectedTime = hour + minute / 60;
          if (selectedTime >= currentTime) {
            this.horas.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
          }
        } else {
          this.horas.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
        }
      }
    }
  }
}