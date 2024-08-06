// Importa la interfaz CanActivateFn que se usa para definir guardias de rutas en Angular.
// Un guardia de rutas se utiliza para controlar el acceso a ciertas rutas basándose en condiciones.
import { CanActivateFn } from '@angular/router';

// Importa la función 'inject' desde el módulo '@angular/core' para obtener instancias de servicios inyectables.
import { inject } from '@angular/core';

// Importa el servicio 'AuthService' para gestionar la autenticación de usuarios.
import { AuthService } from '../services/auth.service';

// Importa el servicio 'Router' para navegar a diferentes rutas.
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// Define un guardia de rutas llamado 'authGuard' que implementa la interfaz CanActivateFn.
// Este guardia se asegura de que el usuario esté autenticado y tenga permisos para acceder a la ruta.
export const authGuard: CanActivateFn = (route, state) => {
  // Usa la función 'inject' para obtener instancias del servicio de autenticación y del enrutador.
  const service = inject(AuthService);
  const router = inject(Router);

  // Verifica si el usuario está autenticado utilizando el método 'authenticated()' del servicio de autenticación.
  if (service.authenticated()) {
    // Si el usuario está autenticado, verifica si el token ha expirado llamando a la función 'isTokenExpired()'.
    if (isTokenExpired()) {
      // Si el token ha expirado, cierra la sesión del usuario, navega a la página de inicio de sesión y bloquea el acceso.
      service.logout();
      router.navigate(['/login']);
      return false;
    }

    // Si el usuario está autenticado y tiene permisos de administrador, permite el acceso a la ruta.
    return true;
  }

  // Si el usuario no está autenticado, navega a la página de inicio de sesión y bloquea el acceso.
router.navigate(['/login']);
Swal.fire("Para poder acceder primero Inicia Sesion");
return false;
};



// Define una función auxiliar 'isTokenExpired' para verificar si el token de autenticación ha expirado.
// Esta función decodifica el payload del token y compara la fecha de expiración con la fecha actual.
const isTokenExpired = () => {
// Usa la función 'inject' para obtener una instancia del servicio de autenticación.
const service = inject(AuthService);
// Obtiene el token de autenticación desde el servicio.
const token = service.token;
// Decodifica el payload del token utilizando el método 'getPayload()' del servicio.
const payload = service.getPayload(token);
// Extrae la fecha de expiración del payload del token.
const exp = payload.exp;
// Obtiene la fecha y hora actual en segundos.
const now = new Date().getTime() / 1000;
// Compara la fecha actual con la fecha de expiración y retorna 'true' si el token ha expirado, de lo contrario retorna 'false'.
return (now > exp) ? true : false;
}