import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../service/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public product:any =[];
  public grantTotal :number=0 ;
 

  constructor(private cartService :CartServiceService) { }

  ngOnInit(): void {
    this.cartService.getProduct()
    .subscribe(res =>{
      this.product =res;
      this.grantTotal =this.cartService.getTotalPrice();
    })
  }

  removeItem(item :any ){
    this.cartService.removeCart(item)

  }

  emptyCart(){
    this.cartService.removeAllCart()
  }

}
