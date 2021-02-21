import { UserToken } from './userToken.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  token: string;

  private isAuth = new Subject<boolean>();

  private isAuthentaced: boolean = false;

  private timeExpiresFinished: any;

  private userId: string;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return localStorage.getItem('token');
  }

  getIsAuth() {
    return this.isAuth.asObservable();
  }

  getIsAuthentcated() {
    return this.isAuthentaced;
  }

  getUserId() {
    return this.userId;
  }

  signUp(user: User) {
    return this.http.post<User>('http://localhost:3000/api/user/signup', user);
  }

  login(user: User) {
    return this.http.post<UserToken>('http://localhost:3000/api/user/login', user).subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token) {
        const tokenTimeExpires = response.tokenExpires;
        this.setAuthTimer(tokenTimeExpires);
        this.isAuthentaced = true;
        this.userId = response.userId;
        this.isAuth.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + tokenTimeExpires * 1000);

        this.saveAuthData(token, expirationDate, this.userId); // save token and expriartion time in localstorage
        this.router.navigate(['/'])

      }

    })
  }

  logOut() {
    this.token = null;
    this.isAuthentaced = false;
    this.isAuth.next(false);
    this.userId = null;
    clearTimeout(this.timeExpiresFinished); // remove timer
    this.clearAuthData();
    this.router.navigate(['/'])

  }

  autoAuthData() {

    const authInfo = this.getAuthData();
    if(!authInfo) {
      return;
    }
    const now = new Date();

    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.isAuthentaced = true;
      this.userId = authInfo.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.isAuth.next(true);
    }

  }


  private setAuthTimer(duration: number) {
    this.timeExpiresFinished = setTimeout(() => { // function when finish token expires is logout
      this.logOut();
    }, duration * 1000);
  }


  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId')

    if(!token || !expirationDate) {
      return;
    }

    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }
}
