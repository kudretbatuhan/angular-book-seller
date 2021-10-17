import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private currenUser: User = new User;

  constructor(private authenticationService:AuthenticationService,private router:Router){
    this.authenticationService.currentUser.subscribe(data=>{
      this.currenUser =data;
    });
  }



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.currenUser){
        if(route.data.roles?.indexOf(this.currenUser.role)== -1){
          this.router.navigate(['/401']);
        }

        return true;
      }
      this.router.navigate(['/login']);
    return true;
  }
  
}
