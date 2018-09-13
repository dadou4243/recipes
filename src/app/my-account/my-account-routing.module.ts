import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyAccountComponent } from './my-account.component';
import { EditInfoComponent } from './edit-info/edit-info.component';
import { AuthGuard } from '../core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: MyAccountComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'info', pathMatch: 'full'},
      {path: 'info', component: EditInfoComponent},
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MyAccountRoutingModule { }

