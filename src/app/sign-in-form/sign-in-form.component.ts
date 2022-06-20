import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {
  signInForm:FormGroup | any;

  errorMessage: any;

  constructor(private authService: AuthServiceService, 
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.signInForm =new FormGroup({
      'email':new FormControl(null,[Validators.required]),
      'password':new FormControl(null,[Validators.required])
    })
  }

  signIn(signInForm:FormGroup){
    console.log(signInForm.value)
    

  }

}
     

  

  // sign(sign_In_form:FormGroup){
  //   this.router.navigate(['/sign'])


  // }

  

