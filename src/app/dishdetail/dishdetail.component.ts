import { Component, OnInit } from '@angular/core';
import {Dish} from '../shared/dish';
import { Params,ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import 'rxjs/add/operator/switchMap';
import { DishService } from "../services/dish.service";
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {
  
   dish : Dish;

   dishIds: number[];
   prev: number;
   next: number;
  constructor(private dishService:DishService,private location:Location,private route:ActivatedRoute) { }

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
}
