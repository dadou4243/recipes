import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountComponent } from './my-account.component';
import { EditInfoComponent } from './edit-info/edit-info.component';

@NgModule({
  imports: [
    CommonModule,
    MyAccountRoutingModule,
    SharedModule
  ],
  declarations: [
    MyAccountComponent,
    EditInfoComponent
  ]
})
export class MyAccountModule { }
