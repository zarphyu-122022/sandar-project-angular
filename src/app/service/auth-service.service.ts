import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { retry } from 'rxjs';
import { SignIn } from '../models/sign_in.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private _isLogin=false;
  singIn :SignIn[] |any;
  email ='sandar@gmail.com';
  paaaword =12345;


  LogInorLogOut(){

    return this._isLogin =!this._isLogin
  //  if(this.singIn.email == this.email && this.singIn.pwssword == this.paaaword){
  //    this._isLogin =!this._isLogin ;

  //  }
   
    
  }
  
  get _login(){
    return this._isLogin
  }


  constructor() { }
}
