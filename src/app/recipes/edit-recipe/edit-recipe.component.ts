import { Component, OnInit } from '@angular/core';
import { RecipesService } from './../../services/recipes.service';
import { FormArray, Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipes.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {

  recipe: Recipe;

  recipeForm: FormGroup;

  categories: any[] = [
    {value: 'Salad', viewValue: 'Salad'},
    {value: 'Hot Meal', viewValue: 'Hot Meal'},
    {value: 'Desert', viewValue: 'Desert'}
  ];

  units: any[] = [
    {value: 'grams', viewValue: 'Grams'},
    {value: 'liters', viewValue: 'Liters'},
    {value: 'units', viewValue: 'Units'},
  ];

  filteredIngredients: Observable<any>[] = [];

  ingredientsList: any[];

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit() {
    this.recipeForm = this.fb.group({
      name: [''],
      duration: [''],
      ingredients: this.fb.array([]),
      category: [''],
      level: [''],
      picture: [''],
      cost: [''],
      quantity: [''],
      steps: this.fb.array([])
    });

    this.getIngredients();
    this.addStep();
    this.getRecipe();
  }

getRecipe(): void {
  const id: string = this.route.snapshot.paramMap.get('id');
    this.recipesService.getRecipe(id).subscribe(result => {
      this.recipe = result;
      console.log(result);
      this.recipeForm.patchValue({
        'name': this.recipe.name,
        'duration': this.recipe.duration,
        'category': this.recipe.category,
        'ingredients': this.recipe.ingredients
      });
    });
}

  get ingredientsForm() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get stepsForm() {
    return this.recipeForm.get('steps') as FormArray;
  }

  getIngredients() {
    this.recipesService.getIngredients().subscribe(result => {
      this.ingredientsList = result.map(ingredient => ingredient.name);
      this.addIngredient();
    });
  }

  addIngredient() {
    const ingredientGroup = this.fb.group({
      name: [],
      quantity: ['1'],
      unit: [],
    });

    this.ingredientsForm.push(ingredientGroup);
    this.addAutocompletion();
  }

  addStep() {
    const stepGroup = this.fb.group({
      description: [],
      duration: [],
    });

    this.stepsForm.push(stepGroup);
  }

  deleteIngredient(i) {
    this.ingredientsForm.removeAt(i);
    this.deleteAutocompletion(i);
  }

  deleteStep(i) {
    this.stepsForm.removeAt(i);
  }

  addAutocompletion() {
    const ingredientsLength = this.ingredientsForm.controls.length - 1;

    this.filteredIngredients.push(this.ingredientsForm.controls[ingredientsLength].get('name').valueChanges
      .pipe(
        startWith(''),
        map(ingredient => {
          return ingredient ? this._filterIngredients(ingredient) : this.ingredientsList.slice();
        })
      ));
      this.filteredIngredients[ingredientsLength].subscribe(result => console.log(result));
  }

  private _filterIngredients(value): any[] {
    console.log(value);
    const filterValue = value.toLowerCase();

    return this.ingredientsList.filter(ingredient => ingredient.toLowerCase().indexOf(filterValue) === 0);
  }

  deleteAutocompletion(i) {
    this.filteredIngredients.splice(i, 1);
  }

  onSave() {
    console.log(this.recipeForm.value);
    const req = this.recipeForm.value;
    req['_id'] = this.recipe._id;
    this.recipesService.editRecipe(req).subscribe(
      res => this.router.navigateByUrl('recipes'),
      error => console.log(error)
    );
  }

  resetForm() {
    // REPLACE BY DEFAULT VALUE
    // this.recipeForm.reset();
  }

}
