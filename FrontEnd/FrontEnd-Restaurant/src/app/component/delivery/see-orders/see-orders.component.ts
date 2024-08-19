import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { OrderServicesService } from '../../../services/order-services.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { error } from 'console';
import { interval, Subscription } from 'rxjs';

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
  pollingSubscription: Subscription = new Subscription();
  pollingInterval: number = 3000; // Intervalo en milisegundos (5 segundos)



  constructor(
    private service: OrderServicesService,
    private cdr: ChangeDetectorRef
  ){
    const todayDate = new Date();
    const day = String(todayDate.getDate()).padStart(2, '0');
    const month = String(todayDate.getMonth() + 1).padStart(2, '0');
    const year = todayDate.getFullYear();
    this.today = `${year}-${month}-${day}`;

  }
  ngOnInit(): void {

    this.loadOrders();
    this.startInterval();
  }

  loadOrders(): void {
    this.service.findAllOrders().subscribe(order => {
      this.orders = order.map(order => ({
        ...order,
        products: JSON.parse(order.products) // Asegúrate de esta conversión
      }));
      this.filterOrders();
    });
  }

  startInterval(){
    this.pollingSubscription.add(
      interval(this.pollingInterval).subscribe(() => {
        this.loadOrders();
      })
    );
  }
  ngOnDestroy(): void {
    this.pollingSubscription.unsubscribe();
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

    orderManager(id: number, state: string){

      this.service.updateState(id, state).subscribe({
        next: (response) => {
          console.log('Order updated successfully:', response);
          this.loadOrders();
          this.cdr.detectChanges(); // Forza la detección de cambios
        },
        error: (error) => {
          console.error('Error updating order:', error);
        }
      });


    }

    deleteOrderById(id: any) {
      this.service.remove(id).subscribe({
        next: (response) =>{
          this.orders.filter(item => item.id !== id);
          console.warn("La reserva con id ("+ id + ") ha sido borrada");
          Swal.fire({
            icon: "success",
            title: "Pedido Borrado",
            showConfirmButton: false,
            timer: 1500
          });
          this.loadOrders();
        },
        error: (error) =>{
          Swal.fire({
            icon: "error",
            title: error,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      }

   
}
