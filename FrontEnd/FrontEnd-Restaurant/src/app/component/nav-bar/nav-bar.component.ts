import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  @ViewChild('topElement') topElement!: ElementRef;

  // Función que se llamará cuando selecciones una opción del menú
  scrollToTop() {
    this.topElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  menuActivo = false;

  user!: User;

  constructor(
     private authService: AuthService,
     private router: Router
  ){}

  toggleMenu() {
    this.menuActivo = !this.menuActivo;
  }

  closeMenu() {
    this.topElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.menuActivo = false;
  }
  
  get login() {
    return this.authService.user;
  }

  get admin() {
    return this.authService.isAdmin();
  }

  handlerLogout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
