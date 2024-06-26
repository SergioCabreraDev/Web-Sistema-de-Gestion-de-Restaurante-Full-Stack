import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { RestauranteServiceService } from '../../services/restaurante-service.service';
import { User } from '../../models/User';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ForgotPasswordComponent,RouterOutlet, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {



  constructor(
    private sharingData: SharingDataService,
    private service: RestauranteServiceService
  ){

  }
  ngOnInit(): void {
    console.log("createUser():")
    this.sharingData.emitterNewUser.subscribe(user =>{
      console.log(user)

      
    })
  }


  
  createUser(){
    


  }

}
