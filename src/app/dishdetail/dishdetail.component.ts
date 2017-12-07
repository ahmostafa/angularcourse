import { Component, OnInit } from '@angular/core';
import {Dish} from '../shared/dish';
import { Params,ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { FormBuilder,FormGroup,Validator,Validators } from "@angular/forms";


import 'rxjs/add/operator/switchMap';
import { DishService } from "../services/dish.service";
import { Comment } from '../shared/comment';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  
   dish : Dish;

   dishIds: number[];
   prev: number;
   next: number;

   commentForm:FormGroup;
   comment:Comment;
   formErrors={
    'writername':'',
    'commenttext':''
  };

  validationMessages = {
    'writername': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 25 characters long.'
    },
    'commenttext': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    }
  };
  constructor(private dishService:DishService,private location:Location,private route:ActivatedRoute,private fb:FormBuilder) {
    this.createForm();
   }

  ngOnInit() {

    this.dishService.getDishsIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
    .switchMap((params:Params)=> this.dishService.getDish(+params['id']))
     .subscribe(dish => {this.dish = dish; this.setPrevNext(dish.id)});
  }


  setPrevNext(dishId:number){
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length  + index -1 )%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length  + index +1 )%this.dishIds.length];
  }

  goBack():void{
    this.location.back();
  }

  onSubmit():void{

  }

  createForm(): void {
    this.commentForm = this.fb.group({
      writername:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      commenttext:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]]

    });
    this.commentForm.valueChanges
    .subscribe(data=>this.onValueChanged(data));

    this.onValueChanged();// reset validation
  }

  onValueChanged(data?: any):void{
    if(!this.commentForm){return;}
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
}
