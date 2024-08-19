import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { catchError, Observable, throwError } from 'rxjs';
import { URL_AWS, URL_LOCALHOST } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class OrderServicesService {



  private urlOrder: string = URL_LOCALHOST + '/api/orders';  // URL base


  constructor(private http: HttpClient) { }

  // Método para crear una reserva
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.urlOrder, order).pipe(
      catchError(this.handleError)
    );
  }

  // Método para crear una reserva
  findAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.urlOrder).pipe(
      catchError(this.handleError)
    );
  }

  remove(id: number): Observable<void>{
    return this.http.delete<void>(`${this.urlOrder}/${id}`);
  }

  // Método para encontrar un usuario por email
  findOderByNumber(phoneNumber: string): Observable<Order[]> {
    const params = new HttpParams().set('phoneNumber', phoneNumber);
    return this.http.get<Order[]>(`${this.urlOrder}/find`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  updateState(id: number, state: string): Observable<Order> {
    const token = localStorage.getItem('authToken');  // Obtener el token del localStorage
    const params = new HttpParams().set('state', state);
    const url = `${this.urlOrder}/${id}`;
  
    console.info('Generated URL:', url, 'Params:', params.toString());
  
    // Configuración de los headers, incluyendo el token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.put<Order>(url, null, { params, headers }).pipe(
      catchError((error) => {
        console.error('Error occurred during update:', error);
        return throwError(() => error);
      })
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
