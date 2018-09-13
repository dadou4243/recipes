import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchInput: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const searchKeywords = params['name'];
      console.log(searchKeywords);
      this.searchInput = searchKeywords;
    });
  }

  search(searchInput) {
    searchInput = searchInput.trim();
    // console.log(searchInput);
    this.router.navigate(['/search'], { queryParams: { name: searchInput } });
  }

}
