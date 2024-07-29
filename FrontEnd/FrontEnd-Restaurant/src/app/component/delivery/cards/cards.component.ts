import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../../../services/user-services.service';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit {

  burgers: any= []
  starters: any=[]
  desserts: any=[]

  constructor(
    private service: UserServicesService
  ){}
  ngOnInit(): void {
    this.burgers=this.service.findAllBurgers();
    this.starters=this.service.findAllStarters();
    this.desserts = this.service.findAllDesserts();
  }



}
