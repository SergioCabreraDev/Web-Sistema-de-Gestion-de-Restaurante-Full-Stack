import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharingDataService } from '../../../services/sharing-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {

  

  cart: any[] = [];
  numeroDeObjetos: number = 0;
  indice: number = 0;
  total: number = 0;
  @ViewChild('botonCerrar', { static: true }) miBoton!: ElementRef;
  
  constructor(private sharing: SharingDataService) {}
  
  ngOnInit(): void {
    // Inicializa el número de objetos
    this.numeroDeObjetos = this.cart.length;
  
    // Suscríbete al servicio para recibir nuevos productos
    this.sharing.emitterNewProduct.subscribe(product => {
      this.addToCart(product);
    });

    this.totalAmount();
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
    if(this.cart.length == 0){
      this.hacerClick();
      console.warn("El carro esta vacio")
      Swal.fire(
        'Error',
        'El carro esta vacio, añade algo para poder comprar.',
        'error'
      );
    }else{
      console.warn(this.cart)
    }
    
    }

    hacerClick() {
      this.miBoton.nativeElement.click();
    }
  
  

}
