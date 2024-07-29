import { Injectable } from '@angular/core';
import { reviews } from '../data/index-reviews';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/User';
import { catchError } from 'rxjs/operators';
import { burgers } from '../data/food/burger.data';
import { starters } from '../data/food/entrantes.data';
import { dessert } from '../data/food/dessert.data';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  private urlUsers: string = 'http://localhost:8080/api/users';  // URL base

  constructor(private http: HttpClient) { }


    findAllReviews(): any[]{
      return reviews;
    }
    findAllBurgers(): any[]{
      return burgers;
    }
    findAllStarters(): any[]{
      return starters;
    }
    findAllDesserts(): any[]{
      return dessert;
    }

    // Método para crear un nuevo usuario
    create(user: User): Observable<User> {
      return this.http.post<User>(this.urlUsers, user).pipe(
        catchError(this.handleError)
      );
    }

  // Método para encontrar un usuario por email
  findUserByEmail(email: string): Observable<User> {
    const params = new HttpParams().set('email', email);
    return this.http.get<User>(`${this.urlUsers}/find`, { params }).pipe(
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
