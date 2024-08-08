import { Component, OnInit } from '@angular/core';
import { OrderServicesService } from '../../../services/order-services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-see-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './see-orders.component.html',
  styleUrl: './see-orders.component.css'
})
export class SeeOrdersComponent implements OnInit {

  orders: any[] = []
  orderSelect: any = [];

  constructor(
    private service: OrderServicesService
  ){

  }
  ngOnInit(): void {
   this.service.findAllOrders().subscribe(order =>{
      this.orders = order.map(order => ({
        ...order,
        products: JSON.parse(order.products) // Asegúrate de esta conversión
      }))
    })
  }

  transferOrder(_t16: any) {
    
    this.orderSelect = _t16.products;
    console.log(this.orderSelect);
    }
}
