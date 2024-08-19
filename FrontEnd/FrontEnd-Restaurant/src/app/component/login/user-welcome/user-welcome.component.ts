import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserServicesService } from '../../../services/user-services.service';
import { OrderServicesService } from '../../../services/order-services.service';
import { User } from '../../../models/User';
import { Order } from '../../../models/order';
import { CommonModule } from '@angular/common';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-user-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-welcome.component.html',
  styleUrls: ['./user-welcome.component.css'] // Nota: Corregido de `styleUrl` a `styleUrls`
})
export class UserWelcomeComponent implements OnInit, OnDestroy {

  userDetails!: User;
  orders: Order[] = [];
  orderSelect: any = [];
  pollingSubscription: Subscription = new Subscription();
  pollingInterval: number = 3000; // Intervalo en milisegundos (5 segundos)

  constructor(
    private authService: AuthService,
    private userService: UserServicesService,
    private orderService: OrderServicesService
  ) { }

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
    const email = this.login.user?.email;

    if (email) {
      this.userService.findUserByEmail(email).subscribe(
        (user) => {
          console.log('Usuario encontrado:', user);
          this.userDetails = user;
          this.startPolling();
          this.refreshOrders();
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    } else {
      console.warn('Email del usuario no disponible');
    }
  }

  startPolling() {
    this.pollingSubscription.add(
      interval(this.pollingInterval).subscribe(() => {
        this.refreshOrders();
      })
    );
  }

  refreshOrders() {
    this.orderService.findOderByNumber(this.userDetails.phoneNumber).subscribe(
      (orders) => {
        this.orders = orders.map(order => ({
          ...order,
          products: JSON.parse(order.products)
        }));
        console.log(this.orders);
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

  ngOnDestroy(): void {
    this.pollingSubscription.unsubscribe();
  }
}
