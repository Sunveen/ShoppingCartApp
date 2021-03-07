import { Ingredient } from './ingredient.model';

export class Recipe
{
constructor(public name:string, public desc:string, public imgPath:string,
  public ingredients:Ingredient[]){}

}
