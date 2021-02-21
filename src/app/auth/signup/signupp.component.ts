import { User } from '../user.model';
import { AuthService } from '../auth.service';
import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  isLooading = false

  constructor(private authService: AuthService, public router: Router) {}

  onAddUser(formData: NgForm) {
    if(formData.valid) {
      const user: User = {
        email: formData.value.email,
        password: formData.value.password
      };
      this.authService.signUp(user).subscribe(res => {
        this.router.navigate(['/'])
      })
    } else {
      return;
    }
  }
}
