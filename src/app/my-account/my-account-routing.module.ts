import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAccountComponent } from './my-account.component';


const routes: Routes = [
  {
    path: '',
    component: MyAccountComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/account'
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MyAccountRoutingModule { }

