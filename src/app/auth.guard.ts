import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router:Router,  private authService: AuthService) {
    
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    if (!this.authService.isUserLoggedIn()) { 
     // this.pthSnacky.openConfirmError("Authentication expired", {confirmText: "Vai a Login", hideCloseButton: true, confirmAction : () => {this.windowService.redirectLeaderWindowToLogin()}})
      //this.router.navigate(["ui", "login"],{ queryParams: { retUrl: state.url} });
      //this.windowService.redirectLeaderWindowToLogin();
      return false;  
    }
    return true;
  }
}
