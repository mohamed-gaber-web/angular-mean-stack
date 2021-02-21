import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userIsAuth: boolean = false;
  private authSub: Subscription;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.userIsAuth = this.authService.getIsAuthentcated();
    this.authSub = this.authService.getIsAuth().subscribe(response => {
      this.userIsAuth = response;
    })
  }

  onLogout() {
   this.authService.logOut()
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

}
