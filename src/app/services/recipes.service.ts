import { Recipe } from '../recipes/recipes';
import { RECIPES } from '../recipes/mock-recipes';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class RecipesService {

  recipes;

  constructor() {
    this.getRecipes
  }

  getRecipes(){
    this.recipes = of(RECIPES);
    return this.recipes;
  }
}
