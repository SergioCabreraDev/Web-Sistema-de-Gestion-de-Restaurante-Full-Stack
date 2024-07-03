import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../../models/User';
import { RestauranteServiceService } from '../../../services/restaurante-service.service';
import { SharingDataService } from '../../../services/sharing-data.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import jQuery from 'jquery'; // Importa jQuery


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  user: User;
  errorMessage!: string;
  regex: string = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$';
  // regexPhoneNumber: string ='(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}';
  
  
  constructor(
    private service: RestauranteServiceService,
    private sharingData: SharingDataService,
    private router: Router,
  ){
    this.user = new User();
  
  
  }
    ngOnInit(): void {
  
    }
  
  
  
  onSubmit(itemForm: NgForm) {
  
    if (itemForm.valid) {
      console.log(this.user)
      // this.sharingData.emitterNewUser.emit(this.user)
      this.errorMessage = ""; 
      this.createUser(itemForm)

    }
  
  }
  
  createUser(itemForm:NgForm) {
    this.service.create(this.user).subscribe(
      response => {
        // Operación de creación exitosa, puedes redirigir a otra página, mostrar un mensaje de éxito, etc.
        console.log('Usuario creado:', response);
        
          Swal.fire({
            icon: "success",
            title: "El Registro Se Ha Completado",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/login']);



      },
      error => {
        Swal.fire({
          icon: "error",
          title: error,
          text: "Ingresa otro Usuario o Telefono"
        });
        this.errorMessage = error; // Asigna el mensaje de error para mostrar en tu plantilla
      }
    );
  }
  
  
  viewPassword(){
    
      jQuery('#password').attr('type', function(index, attr) {
        return attr === 'text' ? 'password' : 'text';
      });
   
  }

}




































