import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../../../services/user-services.service';
import { Burgers } from '../../../models/food/Burgers';
import { Starters } from '../../../models/food/Starters';
import { Desserts } from '../../../models/food/Desserts';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [ShoppingCartComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit {


  burgers: Burgers[]= []
  starters: Starters[]=[]
  desserts: Desserts[]=[]

  selectedProduct: any = undefined;

  constructor(
    private service: UserServicesService
  ){}
  ngOnInit(): void {
    this.burgers=this.service.findAllBurgers();
    this.starters=this.service.findAllStarters();
    this.desserts = this.service.findAllDesserts();
  }

  transferInfo(item: any) {
    console.log(item);
    this.selectedProduct = item ?? null; // Usa null si item es undefined o null
    }

}
