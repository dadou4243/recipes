import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JwtService } from './services/jwt.service';
import { UsersService } from './services/users.service';
import { RecipesService } from './services/recipes.service';

import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './layout/header/navigation.component';
import { SearchComponent } from './layout/search/search.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    HomeComponent,
    NavigationComponent,
    SearchComponent,
  ],
  exports: [
    HomeComponent,
    NavigationComponent,
  ],
  providers: [
    RecipesService,
    JwtService,
    UsersService
  ]
})
export class CoreModule { }
