import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import { ShoppingService } from '../shopping-list/shopping.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeListUpdated= new Subject<Recipe[]>();

  constructor(private shoppingService:ShoppingService) { }

  //recipeSelected=new EventEmitter<Recipe>();
  //ingdToShoppingList = new EventEmitter<Ingredient[]>();

  private recipes:Recipe[]=[
    new Recipe('The Big Fat Burger','This is the Italian Burger recipe',
    'assets/images/burger.jpeg',[
      new Ingredient('Bun',1),
      new Ingredient('Cheese Slice',1),
      new Ingredient('Tomato',3)
    ]),
    new Recipe('The Pan Pizza','This is the Pan Pizza recipe',
    'assets/images/Pizza.jpg',[
      new Ingredient('Bread',1),
      new Ingredient('Cheese Slice',4),
      new Ingredient('Onion',5)
    ])
  ];

  getRecipe()
  {
    return this.recipes.slice();
  }

  getRecipeById(id:number){
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients:Ingredient[])
  {
    this.shoppingService.addingredients(ingredients);
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipeListUpdated.next(this.recipes.slice());
  }

  removeRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipeListUpdated.next(this.recipes.slice());
  }

  updateRecipe(index:number, newRecipe:Recipe){
    this.recipes[index]=newRecipe;
    this.recipeListUpdated.next(this.recipes.slice());
  }
}
