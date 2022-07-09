import { AuthServiceService } from 'src/app/service/auth-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormsModule, NgForm, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SignIn } from '../models/sign_in.model';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {
  loginFormCtrl: FormGroup;

  constructor(private LoginService: AuthServiceService, private router: Router) {
    this.loginFormCtrl = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }


  ngOnInit(): void {

  }

  onLogin() {
    if (this.loginFormCtrl.invalid)
      return;

    this.LoginService.loginUser(this.loginFormCtrl.value.email, this.loginFormCtrl.value.password)
    //   .then((result) => {

    //     if (result == null) {
    //       console.log('logging in...');
    //       this.router.navigate(['/manage']);
    //     }
    //     else if (result.isValid == false) {
    //       console.log('login error', result);
    //     }
    //   });
    // }

  }
}











