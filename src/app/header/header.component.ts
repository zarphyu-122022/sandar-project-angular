import { AuthServiceService } from '../service/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartServiceService } from '../service/cart-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public totalItem:number=0;

  constructor(private route:ActivatedRoute,private router:Router,public authService:AuthServiceService,private cartService :CartServiceService) { }

  ngOnInit(): void {
    this.cartService.getProduct().subscribe(res => {
      this.totalItem = res.length

    })
  }
  LogInorLogOut(){
    if(!this.authService._login){
      this.authService.LogInorLogOut()

    }else
    this.authService.LogInorLogOut()
  }
  

  
  

}
