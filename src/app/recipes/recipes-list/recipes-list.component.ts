import { RecipesService } from '../../services/recipes.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes';
import { RECIPES } from '../mock-recipes';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})

export class RecipesListComponent implements OnInit {

  recipes: any;

  constructor(
    private recipesService: RecipesService
  ) { }

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipes = this.recipesService.getRecipes();
    this.recipes.subscribe(result => {
      console.log(result);
    });
  }

  deleteRecipe(id, event) {
    event.stopPropagation();
    this.recipesService.deleteRecipe(id);
  }

}
