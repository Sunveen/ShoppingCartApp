import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  editMode: boolean=false;
  // @Input() selectedIngredient:Ingredient;
@ViewChild('shopForm') shopForm:NgForm;
// @ViewChild('amount') amountElementRef:ElementRef;
//@Output() ingredientAdded=new EventEmitter();
index:number;

  constructor(private shoppingService:ShoppingService) { }

  ngOnInit() {
    this.shoppingService.ingredientEdited.subscribe(index=>{
      this.editMode=true;
      this.index=index;
      var ing=this.shoppingService.getIngredient(index);
      this.shopForm.setValue({
        name:ing.name,
        amount:ing.amount
      })

    })
  }

  onAddButtonClick(shopForm:NgForm)
  {

    var name= shopForm.controls['name'].value;
    var amount= shopForm.controls['amount'].value;
    if(this.editMode)
    {
      this.shoppingService.editIngredient(this.index,new Ingredient(name,amount));
    }
    else{
      var ingredient= new Ingredient(name,amount);
      this.shoppingService.addIngredient(ingredient);
    }

    this.onClear();
    //this.ingredientAdded.emit(ingredient);

  }

  onClear()
  {
    this.shopForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.shoppingService.deleteIngredient(this.index);
    this.onClear();
  }

}
