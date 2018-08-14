import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  links = [
    {
      name: 'My Recipes',
      url: 'recipes'
    },
    {
      name: 'Explore',
      url: 'explore'
    },
    {
      name: 'Create a recipe',
      url: 'create'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
