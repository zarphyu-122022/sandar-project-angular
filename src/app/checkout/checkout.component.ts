import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartServiceService } from '../service/cart-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  

  constructor(private router :Router,private cartService :CartServiceService) { }

  invoice(){
    this.router.navigate(['/invoice'])
    this.cartService.removeAllCart()
    
  }

  ngOnInit(): void {
    
  }

}
