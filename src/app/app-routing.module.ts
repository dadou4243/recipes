import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes-list/recipes.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';

const routes: Routes = [
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/:id', component: RecipeComponent},
  { path: 'account', component: MyAccountComponent },
  { path: 'create', component: AddRecipeComponent },
  { path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

