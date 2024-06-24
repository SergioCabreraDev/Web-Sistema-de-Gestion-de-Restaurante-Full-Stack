import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ForgotPasswordComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


}
