import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IndexComponent } from './component/index/index.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { FooterComponent } from "./component/footer/footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, IndexComponent, NavBarComponent, FooterComponent]
})
export class AppComponent {
  title = 'FrontEnd-Restaurant';


  cookies: boolean = true;


  hideCookies(){
    this.cookies = false
  }

}
