import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { IngredientUnits, Units } from '../../data/recipesForm.model';
import { RecipesService } from '../../core/services/recipes.service';


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  recipeForm: FormGroup;

  categories: any[] = [
    {value: 'Salad', viewValue: 'Salad'},
    {value: 'Hot Meal', viewValue: 'Hot Meal'},
    {value: 'Desert', viewValue: 'Desert'}
  ];

  units: IngredientUnits[] = Units;

  filteredIngredients: Observable<any>[] = [];

  ingredientsList: any[];

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      duration: [''],
      ingredients: this.fb.array([], Validators.required),
      category: ['', Validators.required],
      level: [''],
      picture: [''],
      cost: [''],
      quantity: [''],
      steps: this.fb.array([])
    });

    this.getIngredients();
    this.addStep();
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
      // this.filteredIngredients[ingredientsLength].subscribe(result => console.log(result));
  }

  private _filterIngredients(value): any[] {
    console.log(value);
    const filterValue = value.toLowerCase();

    return this.ingredientsList.filter(ingredient => ingredient.toLowerCase().indexOf(filterValue) === 0);
  }

  deleteAutocompletion(i) {
    this.filteredIngredients.splice(i, 1);
  }

  onSubmit() {
    // console.log(this.recipeForm.value);
    this.recipesService.addRecipe(this.recipeForm.value).subscribe(
      res => this.router.navigateByUrl('recipes'),
      error => console.log(error)
    );
  }

  resetForm() {
    // REPLACE BY DEFAULT VALUE
    this.recipeForm.reset();
  }

}
