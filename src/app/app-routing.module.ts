import { HomeComponent } from './home/home.component';
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes-list/recipes.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';

const routes: Routes = [
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/:id', component: RecipeComponent},
  { path: 'account', loadChildren: 'app/my-account/my-account.module#MyAccountModule' },
  { path: 'create', component: AddRecipeComponent },
  { path: '', component: HomeComponent },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/recipes'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

