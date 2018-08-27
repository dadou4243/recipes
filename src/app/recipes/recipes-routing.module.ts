import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {
        path: 'list',
        component: RecipesListComponent
      },
      {
        path: 'create',
        component: AddRecipeComponent
      },
      {
        path: ':id',
        component: RecipeComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RecipesRoutingModule { }

