import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {


  constructor(private recipeService:RecipeService, private router:Router) { }

  ngOnInit() {
    this.recipes=this.recipeService.getRecipe();
    this.recipeService.recipeListUpdated.subscribe(list=>this.recipes=list);
  }

  recipes:Recipe[]=[];

  onRecipeItemClick(index:number)
  {
    this.router.navigate(['recipes',index]);
  }

}
