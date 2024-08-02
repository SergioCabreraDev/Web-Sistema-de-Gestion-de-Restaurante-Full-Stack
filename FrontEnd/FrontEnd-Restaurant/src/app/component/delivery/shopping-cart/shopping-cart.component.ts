import { Component, OnInit } from '@angular/core';
import { SharingDataService } from '../../../services/sharing-data.service';

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

  constructor(private sharing: SharingDataService) {}

  ngOnInit(): void {
    // Inicializa el número de objetos
    this.numeroDeObjetos = this.cart.length;

    // Suscríbete al servicio para recibir nuevos productos
    this.sharing.emitterNewProduct.subscribe(product => {
      this.addToCart(product);
    });
  }

  addToCart(product: any): void {
    this.cart.push(product);
    this.numeroDeObjetos = this.cart.length; // Actualiza el número de objetos
    console.log(`Product added to cart: `, product);
  }

}
