import { Component } from "@angular/core";

import { AuthService } from './../auth.service';

import { NgForm } from '@angular/forms';
import { User } from '../user.model';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(private authService: AuthService) {}

  onLoginUser(userForm: NgForm) {
    if (userForm.valid) {
      const user: User = {
        email: userForm.value.email,
        password: userForm.value.password
      };

      this.authService.login(user);
    }
  }

}
