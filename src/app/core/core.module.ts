import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JwtService } from './services/jwt.service';
import { UsersService } from './services/users.service';
import { RecipesService } from './services/recipes.service';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { SearchComponent } from './layout/search/search.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    HomeComponent,
    HeaderComponent,
    SearchComponent,
  ],
  exports: [
    HomeComponent,
    HeaderComponent,
  ],
  providers: [
    RecipesService,
    JwtService,
    UsersService
  ]
})
export class CoreModule { }
