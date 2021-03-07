import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {


  constructor(private shoppingService:ShoppingService,private recipeService:RecipeService) { }

  ngOnInit() {
    this.ingredients=this.shoppingService.getIngredients();
    this.shoppingService.ingredientAdded.subscribe(ingredients=>this.ingredients=ingredients);
  }

  ingredients:Ingredient[]=[];

  addIngredient(ingredient:Ingredient)
  {
    this.shoppingService.addIngredient(ingredient);
  }

  onEditIngredient(index:number){
    this.shoppingService.ingredientEdited.next(index);
  }


}
