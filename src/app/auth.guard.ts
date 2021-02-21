import { AuthService } from 'src/app/auth/auth.service';
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";


@Injectable()

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    const userAuth = this.authService.getIsAuthentcated();

    if(!userAuth) {
      this.router.navigate(['/login']);
    } else {
      return true;
    }
  }
}
