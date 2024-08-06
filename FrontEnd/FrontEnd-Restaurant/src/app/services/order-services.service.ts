import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderServicesService {



  private urlOrder: string = 'http://localhost:8080/api/orders';  // URL base


  constructor(private http: HttpClient) { }

    // Método para crear una reserva
    createOrder(order: Order): Observable<Order>{

      return this.http.post<Order>(this.urlOrder, order).pipe(
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
