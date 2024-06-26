import { Injectable } from '@angular/core';
import { reviews } from '../data/index-reviews';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/User';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RestauranteServiceService {

  private url: string = 'http://localhost:8080/api/users';  // URL base del API

  constructor(private http: HttpClient) { }


  findAllReviews(): any[]{
    return reviews;
  }

    // Método para crear un nuevo usuario
    create(user: User): Observable<User> {
      return this.http.post<User>(this.url, user).pipe(
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
