import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  public cartItem: any = [];
  public productlist = new BehaviorSubject<any>([]);
  
  constructor() { }
  getProduct() {
    return this.productlist.asObservable();
  }
  setProduct(product: any) {
    this.cartItem.push(...product)
    this.productlist.next(product)
  }

  addToCart(product: any) {
    // console.log(product)
    this.cartItem.push(product)
    this.productlist.next(this.cartItem)

    this.getTotalPrice();


  }


  getTotalPrice(): number {
    let grandTotal: number = 0;
    this.cartItem.map((a: any) => {
      grandTotal += (+a.quantity * a.price);
    })
    return grandTotal;


  }

  removeCart(product: any) {
    // this.cartItem.map((a: any, index: any) => {
    //   if (product.brand_id === a.brand_id) {
    //     this.cartItem.splice(index, 1)
    //   }

    // })
    this.cartItem.splice(product, 1)
    this.productlist.next(this.cartItem);

  }

  

  removeAllCart() {
    this.cartItem = [];
    this.productlist.next(this.cartItem)
  }
}
