import { Injectable } from '@angular/core';
import { reviews } from '../data/index-reviews';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/User';
import { catchError } from 'rxjs/operators';
import { Booking } from '../models/Booking';


@Injectable({
  providedIn: 'root'
})
export class RestauranteServiceService {

  private urlUsers: string = 'http://localhost:8080/api/users';  // URL base
  private urlBookings: string = 'http://localhost:8080/api/bookings';  // URL base

  constructor(private http: HttpClient) { }


  findAllReviews(): any[]{
    return reviews;
  }

    // Método para crear un nuevo usuario
    create(user: User): Observable<User> {
      return this.http.post<User>(this.urlUsers, user).pipe(
        catchError(this.handleError)
      );
    }

    // Método para crear una reserva
    createBooking(booking: Booking): Observable<Booking>{
      return this.http.post<Booking>(this.urlBookings, booking).pipe(
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
