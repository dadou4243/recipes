import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../data/recipes.model';
import { RecipesService } from '../../core/services/recipes.service';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})

export class RecipesListComponent implements OnInit {

  recipes: Recipe[];

  constructor(
    private recipesService: RecipesService,
  ) { }

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipesService.getRecipes().subscribe(result => {
      // console.log(result);
      this.recipes = result;
    });
  }

  deleteRecipe(id) {
    const pos = this.recipes.map(elem => elem._id).indexOf(id);
        this.recipes.splice(pos, 1);
  }

}
