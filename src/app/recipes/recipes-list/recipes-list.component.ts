import { RecipesService } from '../../services/recipes.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})

export class RecipesListComponent implements OnInit {

  recipes: Recipe[];

  constructor(
    private recipesService: RecipesService,
    private router: Router,
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
