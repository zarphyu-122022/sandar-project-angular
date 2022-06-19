import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  public cartItem: any=[];
  public productlist =new BehaviorSubject<any>([]);

  constructor() { }
  getProduct(){
    return this.productlist.asObservable();
  }
  setProduct(product:any){
    this.cartItem.push(...product)
    this.productlist.next(product)
  }

  addToCart(product :any){
    this.cartItem.push(product)
    this.productlist.next(this.cartItem)
    this.getTotalPrice();
    

  }

  getTotalPrice():number {
    let grandTotal:number =0;
    this.cartItem.map((a :any)=> {
      grandTotal += (+a.total);
    })
    return grandTotal;
   

  }

  removeCart(product : any){
    this.cartItem.map((a:any ,index:any)=>{
      if(product.id === a.id){
        this.cartItem.splice(index,1)
      }

    })
    this.productlist.next(this.cartItem);

  }

  removeAllCart(){
    this.cartItem =[];
    this.productlist.next(this.cartItem)
  }
}
