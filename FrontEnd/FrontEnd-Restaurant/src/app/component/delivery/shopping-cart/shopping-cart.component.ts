import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharingDataService } from '../../../services/sharing-data.service';
import Swal from 'sweetalert2';
import { OrderServicesService } from '../../../services/order-services.service';
import { Order } from '../../../models/order';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UserServicesService } from '../../../services/user-services.service';


@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {



  cart: any[] = [];
  numeroDeObjetos: number = 0;
  indice: number = 0;
  total: number = 0;
  order: Order;
  @ViewChild('botonCerrar', { static: true }) miBoton!: ElementRef;

  direccion: any = undefined;
  cp: any = undefined;
  userDetails: any;
  today: string;
  currentTime!: string;

  constructor(
    private sharing: SharingDataService,
    private service: OrderServicesService,
    private authService: AuthService,
    private userService: UserServicesService

  ) {
    this.order = new Order;
    const todayDate = new Date();
    const day = String(todayDate.getDate()).padStart(2, '0');
    const month = String(todayDate.getMonth() + 1).padStart(2, '0');
    const year = todayDate.getFullYear();
    this.today = `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    this.updateTime();
    // Inicializa el número de objetos
    this.numeroDeObjetos = this.cart.length;

    // Suscríbete al servicio para recibir nuevos productos
    this.sharing.emitterNewProduct.subscribe(product => {
      this.addToCart(product);
    });


    this.totalAmount();
    this.getInfoUser();
  }

  addToCart(product: any): void {
    // Asigna el índice al producto y luego incrementa el índice
    product.indice = this.indice++;

    // Agrega el producto con el índice al carrito
    this.cart.push(product);

    // Actualiza el número de objetos
    this.numeroDeObjetos = this.cart.length;

    console.log(`Product added to cart: `, product);
    this.totalAmount();
  }

  removeFromCart(indiceProduct: number): void {
    // Filtra el carrito para eliminar el producto con el índice especificado
    this.cart = this.cart.filter(product => product.indice !== indiceProduct);

    // Actualiza el número de objetos
    this.numeroDeObjetos = this.cart.length;

    this.totalAmount();

    console.log(`Product removed from cart. Current cart: `, this.cart);
  }

  totalAmount() {
    this.total = this.cart.reduce((acc, product) => acc + product.price, 0);
    this.total = Number((Math.round(this.total * 100) / 100).toFixed(2));
    console.log('Total amount:', this.total);
    return this.total;
  }

  pay() {
    if (this.cart.length == 0) {
      this.hacerClick();
      console.warn("El carro esta vacio")
      Swal.fire(
        'Error',
        'El carro esta vacio, añade algo para poder comprar.',
        'error'
      );
    } else if (this.cp == undefined || this.direccion == undefined) {
      this.hacerClick();
      Swal.fire(
        'Error',
        'No Rellena Bien Todos Los Campos de Direccion',
        'error'
      );
    }
    else {
      this.updateTime();
      this.order.products = JSON.stringify(this.cart);
      this.order.price = this.total;
      this.order.direction = this.direccion;
      this.order.phoneNumber = this.userDetails.phoneNumber;
      this.order.date= this.today;
      this.order.time = this.currentTime;


      console.log(this.order);

      this.service.createOrder(this.order).subscribe(
        response => {
          // Operación de creación exitosa, puedes redirigir a otra página, mostrar un mensaje de éxito, etc.
          console.log('Usuario creado:', response);
          this.hacerClick();
          Swal.fire({
            title: "Le enviaremos un sms cuando su pedido este en camino",
            showDenyButton: true,
            confirmButtonText: "Entendido",
            denyButtonText: `Cancelar, pedido.`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire("Pedido Confirmado!", "", "success");
              this.cart = [];
              this.cp = undefined;
              this.direccion = undefined;
              this.numeroDeObjetos = 0;

            } else if (result.isDenied) {
              Swal.fire("Pedido Cancelado, puede seguir modificando el carrito", "", "info");
            }
          });




        },
        error => {
          Swal.fire({
            icon: "error",
            title: error,
            text: "La Reserva no es Valida"
          });

        }
      );
    }

  }

  hacerClick() {
    this.miBoton.nativeElement.click();
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

  updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    this.currentTime = `${hours} : ${formattedMinutes}`;
    console.log(this.currentTime);
  }

}
