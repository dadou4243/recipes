import { SearchResultsComponent } from './search-results/search-results.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { LogInComponent } from './authentication/log-in/log-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent},
  { path: 'search', component: SearchResultsComponent},
  { path: 'login', component: LogInComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
  { path: 'profile', loadChildren: './my-account/my-account.module#MyAccountModule'},
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

