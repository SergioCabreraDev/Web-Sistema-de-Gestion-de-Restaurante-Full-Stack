import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { User } from '../../models/User';
import { UserServicesService } from '../../services/user-services.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ForgotPasswordComponent, RouterOutlet, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;

  constructor(
    private sharingData: SharingDataService,
    private authService: AuthService,
    private router: Router
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.sharingData.emitterNewUser.subscribe(user => {
      console.log(user);
    });

  }

  createUser() {
    if (!this.user.email || !this.user.password) {
      Swal.fire(
        'Error de validacion',
        'Username y password requeridos!',
        'error'
      );
    } else {
      this.authService.loginUser({ email: this.user.email, password: this.user.password }).subscribe({
        next: response => {
          const token = response.token;
          console.log(token);
          const payload = this.authService.getPayload(token);

          const user = { email: payload.sub };
          const login = {
            user,
            isAuth: true,
            isAdmin: payload.isAdmin
          };

          // Check if running in the browser before accessing sessionStorage
          if (typeof window !== 'undefined' && window.sessionStorage) {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('login', JSON.stringify(login));
          }

          this.authService.token = token;
          this.authService.user = login;
          this.router.navigate(['/welcome']);
        },
        error: error => {
          if (error.status == 401) {
            Swal.fire('Error en el Login', error.error.message, 'error');
          } else {
            throw error;
          }
        }
      });
    }
  }
}
