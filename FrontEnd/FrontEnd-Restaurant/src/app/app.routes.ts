import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { IndexComponent } from './component/index/index.component';
import { RegisterComponent } from './component/login/register/register.component';
import { ForgotPasswordComponent } from './component/login/forgot-password/forgot-password.component';
import { BookingsComponent } from './component/bookings/bookings.component';
import { SeeBookingsComponent } from './component/bookings/see-bookings/see-bookings.component';
import { Forbidden403Component } from './component/forbidden403/forbidden403.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/index'
    },
    {
        path: 'index',
        component: IndexComponent
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [loginGuard]
    },
    {
        path: 'users/register',
        component: RegisterComponent
    },
    {
        path: 'bookings',
        component: BookingsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'bookings/see-bookings',
        component: SeeBookingsComponent, 
        canActivate: [authGuard]

    },
    {
        path: 'forbidden',
        component: Forbidden403Component
    }
];
