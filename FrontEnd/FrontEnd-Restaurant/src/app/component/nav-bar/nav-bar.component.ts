import { Component } from '@angular/core';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  menuActivo = false;

  toggleMenu() {
    this.menuActivo = !this.menuActivo;
  }

  closeMenu() {
    this.menuActivo = false;
  }
  
}
