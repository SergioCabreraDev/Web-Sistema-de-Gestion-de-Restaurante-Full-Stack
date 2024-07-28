import { HttpInterceptorFn } from '@angular/common/http';

// Importa el servicio 'AuthService' desde el directorio '../services/auth.service'.
// Este servicio proporciona el token de autenticación.
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

// Define un interceptor HTTP llamado 'tokenInterceptor' que implementa la interfaz HttpInterceptorFn.
// Los interceptores permiten modificar las solicitudes y respuestas HTTP en Angular.
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  // Usa la función 'inject' para obtener una instancia del servicio 'AuthService'.
  // Luego, accede al token de autenticación desde el servicio.
  const token = inject(AuthService).token;

  // Verifica si el token no es 'undefined' (es decir, si existe un token).
  if (token != undefined) {
    // Clona la solicitud HTTP original 'req' y agrega un encabezado 'Authorization' con el token.
    // La cadena 'Bearer ${token}' es el formato común para los tokens de autenticación.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    // Pasa la solicitud clonada con el encabezado 'Authorization' a la siguiente etapa de procesamiento.
    return next(authReq);
  }

  // Si no hay un token disponible, pasa la solicitud original sin modificar a la siguiente etapa de procesamiento.
  return next(req);
};
