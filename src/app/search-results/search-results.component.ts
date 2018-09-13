import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../core/services/recipes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  recipesResults: any[] = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipesService: RecipesService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const searchKeywords = params['name'];
      console.log(searchKeywords);
      this.recipesService.searchRecipe(searchKeywords).subscribe(res => {
        this.recipesResults = res;
        console.log(res);
      });
    });
  }



}
