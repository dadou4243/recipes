import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JwtService } from './services/jwt.service';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { RecipesService } from './services/recipes.service';

import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './display/navigation/navigation.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    HomeComponent,
    NavigationComponent,
  ],
  exports: [
    HomeComponent,
    NavigationComponent,
  ],
  providers: [
    RecipesService,
    AuthService,
    JwtService,
    UsersService
  ]
})
export class CoreModule { }
