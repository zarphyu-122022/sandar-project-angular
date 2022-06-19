import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthServiceService } from "./auth-service.service";

@Injectable({
    providedIn:'root'
})
export class AuthGuardService implements CanActivate{
    constructor(private authService:AuthServiceService,private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
       if(this.authService._login){
        return true;

       }
    }
}
    

