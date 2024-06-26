import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { IndexComponent } from './component/index/index.component';
import { RegisterComponent } from './component/login/register/register.component';
import { ForgotPasswordComponent } from './component/login/forgot-password/forgot-password.component';

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
        component: LoginComponent
    },
    {
        path: 'users/register',
        component: RegisterComponent
    },
    {
        path: 'forgotpassword',
        component: ForgotPasswordComponent
    },
];
