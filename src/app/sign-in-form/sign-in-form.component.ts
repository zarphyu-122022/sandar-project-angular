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

  errorMessage: any;

  constructor(private authService: AuthServiceService, 
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  signIn(signInForm: NgForm){
    
    // this.errorMessage = null;
    this.authService.LogInorLogOut()

    signInForm.reset();
  }

}
     

  

  // sign(sign_In_form:FormGroup){
  //   this.router.navigate(['/sign'])


  // }

  

