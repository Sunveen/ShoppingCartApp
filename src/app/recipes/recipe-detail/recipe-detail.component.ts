import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe:Recipe;
  id:number;
  constructor(private recipeService:RecipeService,
    private activatedRoute: ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{
      this.selectedRecipe= this.recipeService.getRecipeById(+params['id']);
      this.id= +params['id'];
      });
  }

  toShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.selectedRecipe.ingredients);
  }

  onEditClick(){
    this.router.navigate(['edit'],{relativeTo:this.activatedRoute});
  }

  onDeleteRecipe(){
    this.recipeService.removeRecipe(this.id);
    this.router.navigate(['../']);
  }

}
