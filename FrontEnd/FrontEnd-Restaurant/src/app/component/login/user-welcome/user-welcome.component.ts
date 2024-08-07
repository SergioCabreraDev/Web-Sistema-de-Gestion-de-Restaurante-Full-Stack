import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { UserServicesService } from '../../../services/user-services.service';
import { User } from '../../../models/User';
import { OrderServicesService } from '../../../services/order-services.service';
import { Order } from '../../../models/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-welcome.component.html',
  styleUrl: './user-welcome.component.css'
})
export class UserWelcomeComponent implements OnInit {



  userDetails!: User;
  orders: any[]= [];
  orderSelect: any = [];

  constructor(
    private authService: AuthService,
    private userService: UserServicesService,
    private router: Router,
    private orderService: OrderServicesService
 ){

  
 }
  ngOnInit(): void {
 
    this.getInfoUser();
   
  }


get admin() {
  return this.authService.isAdmin();
}
get login() {
  return this.authService.user;
}

getInfoUser() {
  const email = this.login.user?.email;  // Suponiendo que `email` es una propiedad del usuario logueado

  if (email) {
    this.userService.findUserByEmail(email).subscribe(
      (user) => {
        console.log('Usuario encontrado:', user);
        // Aquí puedes manejar la respuesta, por ejemplo, guardando los datos del usuario en una variable
        this.userDetails = user;
        this.getOrders();
        
        
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
        // Manejar el error adecuadamente
      }
    );
  } else {
    console.warn('Email del usuario no disponible');
  }
}

getOrders() {
  this.orderService.findOderByNumber(this.userDetails.phoneNumber).subscribe(
    (orders) => {
      // Convertir el campo 'products' de string a objeto
      this.orders = orders.map(order => ({
        ...order,
        products: JSON.parse(order.products) // Asegúrate de esta conversión
      })
    
    
    );
    console.log(this.orders)
    },
    (error) => {
      console.error('Error al obtener las órdenes:', error);
    }
  );
}


transferOrder(_t16: any) {
  console.log(_t16.products);
  this.orderSelect = _t16.products;
 
  }

}
