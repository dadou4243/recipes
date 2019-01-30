import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../data/recipes.model';
import { RecipesService } from '../../core/services/recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  recipe: Recipe;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.recipesService.getRecipe(id).subscribe(result => {
      this.recipe = result;
      console.log(result);
    });
  }

  goBack(): void {
    this.router.navigateByUrl('recipes/list');
  }

  goToEditRecipe() {
    this.router.navigateByUrl(`recipes/edit/${this.recipe._id}`);
  }

}
