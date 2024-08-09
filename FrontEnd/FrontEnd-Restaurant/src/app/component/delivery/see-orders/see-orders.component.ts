import { Component, OnInit, ViewChild } from '@angular/core';
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
  orderFiltered: any [] = [];
  valueInputDate: any;
  today: string;
  isChecked: boolean = false;

  constructor(
    private service: OrderServicesService
  ){
    const todayDate = new Date();
    const day = String(todayDate.getDate()).padStart(2, '0');
    const month = String(todayDate.getMonth() + 1).padStart(2, '0');
    const year = todayDate.getFullYear();
    this.today = `${year}-${month}-${day}`;

  }
  ngOnInit(): void {
   this.service.findAllOrders().subscribe(order =>{
      this.orders = order.map(order => ({
        ...order,
        products: JSON.parse(order.products) // Asegúrate de esta conversión
      }))
      this.filterOrders();
    })
 
  }

  filterOrders(): void {
    const selectedDate = new Date(this.today);
    this.orderFiltered = this.orders.filter(item => {
      const orderDate = new Date(item.date);
      return orderDate.toDateString() === selectedDate.toDateString();
    });
  }

  transferOrder(_t16: any) {
    
    this.orderSelect = _t16.products;
    console.log(this.orderSelect);
    }

    onCheckboxChange(event: Event): void {

      const inputElement = event.target as HTMLInputElement;
      this.isChecked = inputElement.checked;

      
      if(this.isChecked == true){
        console.log(this.isChecked)
      }
      
    }
}
