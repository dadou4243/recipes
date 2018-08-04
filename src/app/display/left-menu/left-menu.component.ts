import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  links = [
    {
      name: "My Recipes",
      url: "recipes"
    },
    {
      name: "My Account",
      url: "account"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
