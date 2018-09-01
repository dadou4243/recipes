import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';
import { RecipesRoutingModule } from './recipes-routing.module';

import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { RecipesComponent } from './recipes.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RecipesRoutingModule
  ],
  declarations: [
    RecipeCardComponent,
    RecipeComponent,
    RecipesListComponent,
    RecipesComponent,
    AddRecipeComponent,
    EditRecipeComponent
  ]
})
export class RecipesModule { }
