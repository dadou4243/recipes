import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
  {
    path: '',
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
        path: 'my-recipes',
        component: MyRecipesComponent
      },
      {
        path: 'edit/:id',
        component: EditRecipeComponent
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

