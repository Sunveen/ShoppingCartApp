import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

ingredientEdited=new Subject<number>();

  constructor() { }

  private ingredients:Ingredient[]=[
    new Ingredient('Apple',5),
    new Ingredient('Tomato',6)
  ]

  ingredientAdded=new EventEmitter<Ingredient[]>();

  getIngredients()
  {
    return this.ingredients.slice();
  }

  getIngredient(index:number){
    return this.ingredients[index];
  }

  addIngredient(ingredient:Ingredient)
  {
    this.ingredients.push(ingredient);
    this.ingredientAdded.emit(this.ingredients.slice());
  }

  editIngredient(index:number,newIngredient:Ingredient){
    this.ingredients[index]=newIngredient;
    this.ingredientAdded.emit(this.ingredients.slice());
  }

  addingredients(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientAdded.emit(this.ingredients.slice());
  }
  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientAdded.emit(this.ingredients.slice());
  }
}
