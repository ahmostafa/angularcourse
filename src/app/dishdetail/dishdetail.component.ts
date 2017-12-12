import { Component, OnInit,Inject } from '@angular/core';
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
   dishcopy=null;
   errMess:string;

   dishIds: number[];
   prev: number;
   next: number;
   
   commentForm:FormGroup;
   comment:Comment;
   formErrors={
    'author':'',
    'comment':''
  };

  validationMessages = {
    'author': {
      'required':      'Auther Name is required.',
      'minlength':     'Auther Name must be at least 2 characters long.',
      'maxlength':     'Auther Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Comment is required.'/*,
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'*/
    }
  };
  constructor(private dishService:DishService,private location:Location,
    private route:ActivatedRoute,private fb:FormBuilder,@Inject('BaseURL') private BaseURL) {
    this.createForm();
   }

  ngOnInit() {

    this.dishService.getDishsIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
    .switchMap((params:Params)=> this.dishService.getDish(+params['id']))
     .subscribe(dish => {this.dish = dish;this.dishcopy=dish ;this.setPrevNext(dish.id)},
     errmess=> {this.errMess = <any>errmess});
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
    // this.feedback = this.feedbackForm.value;
    // console.log(this.feedback);
    // this.feedbackForm.reset({
    //   firstname:'',
    //   lastname:'',
    //   telnum:'',
    //   email:'',
    //   agree:false,
    //   contacttype:'None',
    //   message:''
    // });

    this.comment = this.commentForm.value;
    this.comment.date= Date.now().toString();
    this.commentForm.reset({
      author:'',
      rating:1,
      comment:''
    })
    this.dishcopy.comments.push(this.comment);
    this.dishcopy.save()
    .subscribe(dish => this.dish =dish);

  }

  createForm(): void {
    this.commentForm = this.fb.group({
      
      author:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      comment:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      rating:[1]
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
