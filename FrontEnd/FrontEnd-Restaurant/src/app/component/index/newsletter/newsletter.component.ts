import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { error } from 'console';
import { response } from 'express';
import Swal from 'sweetalert2';

@Component({
  selector: 'newsletter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css'
})
export class NewsletterComponent {
email!: string;

constructor(private http: HttpClient){

}

onSubmit(itemForm: any) {
  // Asegúrate de que this.email es un valor válido y está formateado correctamente
  this.http.post('http://localhost:8080/api/newsletter',  this.email).subscribe({
    next: (response) => {
      Swal.fire({
        icon: "success",
        title: "¡Gracias por suscribirte!",
        showConfirmButton: false,
        timer: 1500
      });
    },
    error: (error) => {
      Swal.fire({
        icon: "error",
        text: "El email no es valido"
      });
    }
  });
}


}
