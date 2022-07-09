import { Invoice } from './../models/invoice.model';
import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../service/cart-service.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public products: any = [];
  public totalAmount: number = 0;
  closeResult: string = '';


  constructor(private cartService: CartServiceService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cartService.getProduct()
      .subscribe(res => {
        this.products = res;
        
       
        this.products.forEach((item: any) => {
            if(this.products.id === item.id){
              this.products.quantity++
            }
          
          })

          this.products.forEach((item:any) => {
            this.totalAmount += (item.quantity * item.price)

          })  
      
    })
  }

    


  increment(id:any,qty:any) {
      for(let i=0; i<this.products.length ;i++){
      if(this.products[i].id === id){
          this.products[i].quantity =parseInt(qty)+1
         
      }
    }
   
  }

  decrement(id:any,qty:any) {
    for(let i=0; i<this.products.length ;i++){
    if(this.products[i].id === id){
      if(qty !== 1)
        this.products[i].quantity =parseInt(qty)-1
    }
  }
  
}

  
  

  removeItem(content: any, item: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.cartService.removeCart(item)
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
    

  }
  

  emptyCart(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.cartService.removeAllCart()
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

}
