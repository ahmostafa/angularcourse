import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";
import { Promotion } from "../shared/promotion";
import { PromotionService } from "../services/promotion.service";
import { Leader } from "../shared/leader";
import { LeaderService } from "../services/leader.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish:Dish;
  errMess:string;
  promotion:Promotion;
  leader:Leader;
  constructor(private dishservice:DishService,private promotionService:PromotionService
    ,private leaderService:LeaderService,@Inject('BaseURL')private BaseURL) { }

  ngOnInit() {
     this.dishservice.getFeaturedDish()
      .subscribe(dish => {this.dish=dish},errmess=> {this.errMess = <any>errmess});
     this.promotionService.getFeaturedPromotion()
      .subscribe(promotion => this.promotion =promotion);
    this.leaderService.getFeaturedLeader()
      .subscribe(leader => this.leader =leader);
  }

}
