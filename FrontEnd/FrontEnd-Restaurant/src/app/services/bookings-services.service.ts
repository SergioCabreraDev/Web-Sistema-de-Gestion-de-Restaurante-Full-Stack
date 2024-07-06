import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Booking } from '../models/Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingsServicesService {

    private urlBookings: string = 'http://localhost:8080/api/bookings';  // URL base

    constructor(private http: HttpClient) { }

    // Método para crear una reserva
    createBooking(booking: Booking): Observable<Booking>{
      return this.http.post<Booking>(this.urlBookings, booking).pipe(
        catchError(this.handleError)
      );
    }

        // Método para crear una reserva
        findAllBookings(): Observable<Booking[]>{
          return this.http.get<Booking[]>(this.urlBookings).pipe(
            catchError(this.handleError)
          );
        }


        private handleError(error: HttpErrorResponse) {
          let errorMessage = 'Error desconocido';
          if (error.error instanceof ErrorEvent) {
            // Error del lado del cliente
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // Error proveniente del backend
            if (error.status === 500) {
              // 500 es el código de estado para conflicto (teléfono o correo ya existen)
              errorMessage = 'El número de teléfono o correo electrónico ya están registrados.';
            } else {
              errorMessage = `Error: ${error.status} - ${error.error.message}`;
            }
          }
          console.error(errorMessage);
          return throwError(errorMessage);
        }
}
