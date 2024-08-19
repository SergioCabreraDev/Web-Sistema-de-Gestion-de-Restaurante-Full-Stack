import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_AWS } from '../config/config';
import { URL_LOCALHOST } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = URL_LOCALHOST + '/login';
  private _token: string | undefined;
  private _user: any = {
    isAuth: false,
    isAdmin: false,
    user: undefined
  }

  constructor(private http: HttpClient) { }

  loginUser({ email, password }: any): Observable<any> {
      return this.http.post<any>(this.url, { email, password });
  }


  set user(user: any) {
    // Asigna el valor recibido al atributo _user
    this._user = user;
    // Verifica si el entorno es un navegador y tiene acceso a window y sessionStorage
    if (typeof window !== 'undefined' && window.sessionStorage) {
        // Guarda el objeto user en sessionStorage como un string JSON
        sessionStorage.setItem('login', JSON.stringify(user));
    }
}

get user() {
    // Si el usuario ya está autenticado, retorna el objeto _user
    if (this._user.isAuth) {
        return this._user;
    // Si no está autenticado, pero existe un valor en sessionStorage
    } else if (typeof window !== 'undefined' && window.sessionStorage && sessionStorage.getItem('login') != null) {
        // Recupera y asigna el objeto user desde sessionStorage
        this._user = JSON.parse(sessionStorage.getItem('login') || '{}');
        return this._user;
    }
    // Retorna el objeto _user por defecto si no hay información en sessionStorage
    return this._user;
}

set token(token: string) {
    // Asigna el valor recibido al atributo _token
    this._token = token;
    // Verifica si el entorno es un navegador y tiene acceso a window y sessionStorage
    if (typeof window !== 'undefined' && window.sessionStorage) {
        // Guarda el token en sessionStorage
        sessionStorage.setItem('token', token);
    }
}

get token() {
    // Si el token ya está definido, lo retorna
    if (this._token != undefined) {
        return this._token;
    // Si el token no está definido pero existe en sessionStorage
    } else if (typeof window !== 'undefined' && window.sessionStorage && sessionStorage.getItem('token') != null) {
        // Recupera y asigna el token desde sessionStorage
        this._token = sessionStorage.getItem('token') || '';
        return this._token;
    }
    // Retorna el token, aunque esté indefinido, por seguridad
    return this._token!;
}



  getPayload(token: string) {
    if (token != null) {
      return JSON.parse(atob(token.split(".")[1]));
    }
    return null;
  }

  isAdmin() {
    return this.user.isAdmin;
  }

  authenticated() {
    return this.user.isAuth;
  }

  logout() {
    this._token = undefined;
    this._user = {
      isAuth: false,
      isAdmin: false,
      user: undefined
    };
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('token');
  }
}
