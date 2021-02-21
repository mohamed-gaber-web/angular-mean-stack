<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';
=======
import { Component } from '@angular/core';
>>>>>>> 0387165878578ba334eae141a45443f7b67b4b1c

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
<<<<<<< HEAD
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {}
  ngOnInit() {

    this.authService.autoAuthData();

  }
=======
export class AppComponent {
>>>>>>> 0387165878578ba334eae141a45443f7b67b4b1c

}
