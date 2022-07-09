import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Laptop } from 'src/app/models/laptop.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartServiceService } from '../service/cart-service.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  closeResult: string = '';
  ckeckOut:FormGroup |any;
  ngOnInit(): void {
    this.ckeckOut=new FormGroup({
      fname :new FormControl(null,[Validators.required]),
      lname :new FormControl(null,[Validators.required]),
      email :new FormControl(null,[Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phone :new FormControl(null,[Validators.required]),
      street :new FormControl(null,[Validators.required]),
      apartment :new FormControl(null,[Validators.required]),
      city :new FormControl(null,[Validators.required]),
      sphone :new FormControl(null,[Validators.required]),
      billstreet:new FormControl(null,[Validators.required]),
      billapartment:new FormControl(null,[Validators.required]),
      billcity:new FormControl(null,[Validators.required]),
      billphone:new FormControl(null,[Validators.required])
  })
    
  }

  constructor(private router :Router,private cartService :CartServiceService,private modalService: NgbModal) { }

  checkOut(content:any){
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.router.navigate(['/feedback'])
        this.cartService.removeAllCart()
      }
    }, (reason) => {
      this.router.navigate(['/invoice'])
      this.cartService.removeAllCart()

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
    // this.router.navigate(['/invoice'])
    // this.cartService.removeAllCart()
    
  }

  

}
