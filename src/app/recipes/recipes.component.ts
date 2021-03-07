import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  selectedRecipe:Recipe;

  constructor(private recipeService:RecipeService) { }

  ngOnInit() {
    //this.onRecipeItemSelect();
  }

  onRecipeItemSelect()
  {
    //this.recipeService.recipeSelected.subscribe((recipe)=>this.selectedRecipe=recipe);
  }

}
