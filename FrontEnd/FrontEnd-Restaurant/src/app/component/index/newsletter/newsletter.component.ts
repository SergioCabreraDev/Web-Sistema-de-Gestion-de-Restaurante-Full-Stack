import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { error } from 'console';
import { response } from 'express';

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
  alert(this.email)
    this.http.post('http://localhost:8080/api/newsletter', this.email).subscribe({
    next:(response) => {
      alert('te suscribiste')
    },
    error:(error) => {
      alert(error)
    }
  })

}

}
