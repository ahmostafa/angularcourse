import { Injectable } from '@angular/core';
import { Promotion } from "../shared/promotion";
import { PROMOTIONS } from "../shared/promotions";

import { Observable } from 'rxjs/Observable';
import { Restangular, RestangularModule } from "ngx-restangular";
import {ProcessHttpmsgService} from "./process-httpmsg.service"


 import 'rxjs/add/observable/of'
 
 import 'rxjs/add/operator/delay';
 import 'rxjs/add/operator/catch';
 import 'rxjs/add/operator/map';

@Injectable()
export class PromotionService {

  constructor(private restangular:Restangular, private processHttpmsgService:ProcessHttpmsgService) { }

  getPromotions():Observable<Promotion[]>{
    // return Observable.of(PROMOTIONS).delay(2000);
    return this.restangular.all('promotions').getList();
    
    
  }

  getPromotion(id:number):Observable<Promotion>{
    // return Observable.of(PROMOTIONS.filter((promotion) => (promotion.id===id))[0]).delay (2000);
    return this.restangular.one('promotions',id).get();
  }
  getFeaturedPromotion():Observable< Promotion >{
    // return Observable.of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).delay(2000);
    return this.restangular.all('promotions').getList({featured:true})
    .map(dishes => dishes[0]);
    
  }
}
