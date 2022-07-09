import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isLoggedIn: boolean;  

  constructor(private afAuth: AngularFireAuth, private router : Router,  private afs: AngularFirestore) {
    this.isLoggedIn = false;
  }

  loginUser(email: string, password: string): Promise<any> {
      return this.afAuth.signInWithEmailAndPassword(email,password)
        .then(() => {
            // console.log('Auth Service: loginUser: success');
            // console.log(email,password)
            this.isLoggedIn=true;
             this.router.navigate(['/manage']);
        })
        .catch(error => {
          console.log('Auth Service: login error...');
          console.log('error code', error.code);
          console.log('error', error);
          if (error.code)
              return { isValid: false, message: error.message };
          else
              return { isValid: false, message : "Login Error"}
        });
  }
//   SignOut() {
//     // return this.afAuth.signOut().then(() => {
//       this.isLoggedIn
//       this.router.navigate(['/home']);
    
  
// }
}