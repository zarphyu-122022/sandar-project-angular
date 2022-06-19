import { LaptopServiceService } from 'src/app/service/laptop-service.service';
import { Router } from '@angular/router';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { Desktop } from '../models/desktop.model';
import { DesktopService } from '../service/desktop.service';

@Component({
  selector: 'app-laptop',
  templateUrl: './desktop-all.component.html',
  styleUrls: ['./desktop-all.component.css']
})
export class DesktopAllComponent implements OnInit {
  desktop_form:Desktop[]=[];
  public productlist:any;
  isFashing =false;
  url:  any
  constructor(private laptopService:LaptopServiceService,private router:Router, private cartService:CartServiceService,private desktopService:DesktopService) { }
  
  ngOnInit(): void {
    this.isFashing =true;
    this.desktopService.fetchPost()
    .subscribe(post =>{
      this.isFashing= false;
      this.desktop_form=post;

    })  
  }
  

  addtoCart(desktop :any){
    this.cartService.addToCart(desktop)

  }

  

  


  

 

}
