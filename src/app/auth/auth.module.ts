import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './../angular-material.module';


import { SignupComponent } from './signup/signupp.component';
import { LoginComponent } from './login/login.component';

import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    AngularMaterialModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}
