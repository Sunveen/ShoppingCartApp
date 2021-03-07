import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;
  isEditMode=false;
  recipe:Recipe;
  recipeGroup:FormGroup;

  constructor(private route: ActivatedRoute,private recipeService:RecipeService,
    private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.id=+params['id'];
      this.isEditMode = params['id'] != null;
      this.recipe= this.recipeService.getRecipeById(this.id);
      this.initForm();
    });

  }

  deleteIngredient(index:number){
    (<FormArray>this.recipeGroup.get('ingredients')).controls.splice(index,1);
  }

  addIngredient(){
(<FormArray>this.recipeGroup.get('ingredients')).controls.push(new FormGroup({
  name: new FormControl('',Validators.required),
  amount: new FormControl('',[Validators.required,Validators.pattern(/^[1-9]\d*$/)])
}))
  }

  onSubmit(){
    let ingredients:Ingredient[]=[];
    for(var ing of (<FormArray>this.recipeGroup.get('ingredients')).controls){
      ingredients.push(new Ingredient(ing.get('name').value,ing.get('amount').value))
    }

    if(this.isEditMode){
      let updatedRecipe= new Recipe(this.recipeGroup.get('name').value,
      this.recipeGroup.get('description').value,this.recipeGroup.get('imgUrl').value,ingredients);
      this.recipeService.updateRecipe(this.id,updatedRecipe);
    }
    else{
      let newRecipe= new Recipe(this.recipeGroup.get('name').value,
      this.recipeGroup.get('description').value,this.recipeGroup.get('imgUrl').value,ingredients);
      this.recipeService.addRecipe(newRecipe);
    }
this.router.navigate(['../'],{relativeTo:this.route});
  }

  initForm(){
    let name= '';
    let imgPath='';
    let desc='';
    let recipeIngredients=new FormArray([]);

    if(this.isEditMode)
    {
      name= this.recipe.name;
      imgPath=this.recipe.imgPath;
      desc=this.recipe.desc;
      if(this.recipe['ingredients']){
        for(let ingr of this.recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              name:new FormControl(ingr.name,Validators.required),
              amount:new FormControl(ingr.amount,[Validators.required, Validators.pattern(/^[1-9]\d*$/)])
            })
          )
        }
      }
    }

    this.recipeGroup=new FormGroup({
      name:new FormControl(name,Validators.required),
      imgUrl:new FormControl(imgPath,Validators.required),
      description:new FormControl(desc,Validators.required),
      ingredients: recipeIngredients
  });
  }
  onCancelClick(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }
}
