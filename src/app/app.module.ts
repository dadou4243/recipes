import { LeftMenuComponent } from './display/left-menu/left-menu.component';
import { NavigationComponent } from './display/navigation/navigation.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes-list/recipes.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { AppRoutingModule } from './/app-routing.module';
import { MyAccountComponent } from './my-account/my-account.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeComponent,
    NavigationComponent,
    MyAccountComponent,
    LeftMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
