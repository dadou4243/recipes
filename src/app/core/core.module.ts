import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './display/navigation/navigation.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    NavigationComponent,
  ],
  exports: [
    HomeComponent,
    NavigationComponent,
  ]
})
export class CoreModule { }
