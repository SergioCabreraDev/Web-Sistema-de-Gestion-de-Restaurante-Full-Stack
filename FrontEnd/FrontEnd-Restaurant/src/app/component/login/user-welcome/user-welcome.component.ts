import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { UserServicesService } from '../../../services/user-services.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-user-welcome',
  standalone: true,
  imports: [],
  templateUrl: './user-welcome.component.html',
  styleUrl: './user-welcome.component.css'
})
export class UserWelcomeComponent implements OnInit {


  userDetails!: User;

  constructor(
    private authService: AuthService,
    private userService: UserServicesService,
    private router: Router
 ){}
  ngOnInit(): void {
    this.getInfoUser();
  }


get admin() {
  return this.authService.isAdmin();
}
get login() {
  return this.authService.user;
}

getInfoUser() {
  const email = this.login.user?.email;  // Suponiendo que `email` es una propiedad del usuario logueado

  if (email) {
    this.userService.findUserByEmail(email).subscribe(
      (user) => {
        console.log('Usuario encontrado:', user);
        // Aquí puedes manejar la respuesta, por ejemplo, guardando los datos del usuario en una variable
        this.userDetails = user;
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
        // Manejar el error adecuadamente
      }
    );
  } else {
    console.warn('Email del usuario no disponible');
  }
}

}
