import { LaptopServiceService } from './../../service/laptop-service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { Laptop } from 'src/app/models/laptop.model';

@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: ['./view-detail.component.css']
})
export class ViewDetailComponent implements OnInit {
  
  laptop!: Laptop;
  public product : Laptop[] =[]  ;

  constructor(private cartService :CartServiceService) { }

  ngOnInit(): void {
    this.laptop = history.state;

    this.product.forEach((a:any)=>{
      Object.assign(a,{quantity:1,total:a.price})
    })

  }
  addtoCart(laptop:any){
    this.cartService.addToCart(laptop)

  }
   

}
