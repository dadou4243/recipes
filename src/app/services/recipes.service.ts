import { Recipe } from '../recipes/recipes.model';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class RecipesService {

  API_URL = 'http://localhost:4600';

  constructor(private http: HttpClient) {
    this.getRecipes();
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.API_URL + '/api/recipes');
  }

  getRecipe(id): Observable<Recipe> {
    return this.http.get<Recipe>(this.API_URL + '/api/recipes/' + id);
  }

  addRecipe(recipe): Observable<Recipe>  {
    return this.http.post<Recipe>(this.API_URL + '/api/recipes', recipe);
  }

  deleteRecipe(id) {
    return this.http.delete(this.API_URL + '/api/recipes/' + id);
  }

  getIngredients(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL + '/api/ingredients');
  }
}
