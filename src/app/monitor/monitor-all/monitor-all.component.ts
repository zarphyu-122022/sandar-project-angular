import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { Monitor } from 'src/app/models/monitor.model';
import { LaptopServiceService } from 'src/app/service/laptop-service.service';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { MonitorService } from 'src/app/service/monitor.service';

@Component({
  selector: 'app-monitor-all',
  templateUrl: './monitor-all.component.html',
  styleUrls: ['./monitor-all.component.css']
})
export class MonitorAllComponent implements OnInit {

  monitor_form:Monitor[]=[];
  public productlist:any;
  isFashing =false;
  url:  any
  constructor(private laptopService:LaptopServiceService,private router:Router, private cartService:CartServiceService,private monitorService:MonitorService) { }
  
  ngOnInit(): void {
    this.isFashing =true;
    this.monitorService.fetchPost()
    .subscribe(post =>{
      this.isFashing= false;
      this.monitor_form=post;

    })  
  }
  

  addtoCart(laptop :any){
    this.cartService.addToCart(laptop)

  }

}
