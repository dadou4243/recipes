import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Recipe } from '../../data/recipes.model';

@Injectable()

export class RecipesService {

  API_URL = 'http://localhost:4600';

  constructor(private http: HttpClient) {}

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

  editRecipe(recipe): Observable<any> {
    console.log(recipe);
    return this.http.patch<any>(this.API_URL + '/api/recipes/' + recipe._id, recipe);
  }
}
