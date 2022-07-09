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
  public brand_name_filter:string=''

  constructor(private route:ActivatedRoute,private router:Router,public authService:AuthServiceService,private cartService :CartServiceService) { }

  ngOnInit(): void {
    this.cartService.getProduct().subscribe(res => {
       this.totalItem = res.length

    })
  }
  LogInorLogOut(){
    
    if(!this.authService.isLoggedIn){
      this.router.navigate(['/sign-in'])
      this.authService.loginUser

    }else
    this.router.navigate(['/home'])
    this.authService.isLoggedIn=!this.authService.isLoggedIn
  }

  // search(event:any){
  //   this.brand_name_filter=(event.target as HTMLInputElement).value;
  //   console.log(this.brand_name_filter)
  //   this.cartService.search.next(this.brand_name_filter)
  // }
  

  
  

}
