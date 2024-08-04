import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../../../services/user-services.service';
import { Burgers } from '../../../models/food/Burgers';
import { Starters } from '../../../models/food/Starters';
import { Desserts } from '../../../models/food/Desserts';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharingDataService } from '../../../services/sharing-data.service';
import { Drink } from '../../../models/food/drink';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [ShoppingCartComponent, FormsModule, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit {

  // Arrays para almacenar las listas de productos
  burgers: Burgers[] = [];
  starters: Starters[] = [];
  desserts: Desserts[] = [];
  drinks: Drink[] = [];

  // Variable para almacenar el producto actualmente seleccionado
  selectedProduct: any = undefined;

  // Objeto para almacenar mensajes de error de validación
  errors = { point: false, garrison: false };

  // Variable para habilitar o deshabilitar el botón de envío
  isSubmitDisabled = true;

  constructor(
    // Servicios inyectados para obtener datos y compartir información
    private service: UserServicesService,
    private sharing: SharingDataService
  ) {}

  ngOnInit(): void {
    // Inicializa las listas de productos llamando a los métodos del servicio
    this.burgers = this.service.findAllBurgers();
    this.starters = this.service.findAllStarters();
    this.desserts = this.service.findAllDesserts();
    this.drinks = this.service.findAllDrinks();

  }

  // Método para manejar la selección de un producto
  transferInfo(item: any) {
      // Asigna el producto seleccionado o null si el item es undefined o null
      this.selectedProduct = item ?? null;

      // Verifica si el producto seleccionado es de tipo 'burgers'
      if (this.selectedProduct?.type === 'burgers') {
        // Si es una hamburguesa, valida las selecciones
        this.validateSelection();
      } else {
        // Si no es una hamburguesa, limpia los errores y habilita el botón de envío
        this.errors = { point: false, garrison: false };
        this.isSubmitDisabled = false;
      }
  }

  // Método para validar las selecciones del formulario
  validateSelection() {
    // Solo realiza la validación si el producto es de tipo 'burgers'
    if (this.selectedProduct?.type === 'burgers') {
      // Verifica si el campo 'point' está vacío y establece el mensaje de error correspondiente
      this.errors.point = !this.selectedProduct?.point;

      // Verifica si el campo 'garrison' está vacío y establece el mensaje de error correspondiente
      this.errors.garrison = !this.selectedProduct?.garrison;

      // Deshabilita el botón de envío si hay errores en cualquiera de los campos
      this.isSubmitDisabled = this.errors.point || this.errors.garrison;
    }
  }

  // Método para emitir el producto al carrito
  emitProduct() {
    // Si el botón de envío está deshabilitado, muestra un mensaje en la consola y no realiza la emisión
    if (this.isSubmitDisabled) {
      console.log('Formulario no está completo, no se puede enviar.');
      return;
    }

    // Muestra el producto en la consola y emite el producto al carrito
    console.log('Producto añadido al carrito:', this.selectedProduct);
    this.sharing.emitterNewProduct.emit(this.selectedProduct);
  }
}