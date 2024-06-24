import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [RouterLink],
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
