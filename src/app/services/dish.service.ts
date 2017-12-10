import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
//  import {DISHES} from '../shared/dishes';
import { Http,Response } from "@angular/http";
import {ProcessHttpmsgService} from "./process-httpmsg.service"
import { baseURL} from "../shared/baseurl"

 import { Observable } from 'rxjs/Observable';

 import 'rxjs/add/observable/of'
 
 import 'rxjs/add/operator/delay';
 import 'rxjs/add/operator/catch';
 import 'rxjs/add/operator/map';

 import { Restangular, RestangularModule } from "ngx-restangular";

@Injectable()
export class DishService {

  constructor(private restangular:Restangular, private processHttpmsgService:ProcessHttpmsgService) { }
  getDishes():  Observable<Dish[]> {

    // return Observable.of(DISHES).delay(2000) ;    
    // return this.http.get(baseURL + 'dishes')
    // .map(res=>{return this.processHttpmsgService.extractData(res)})
    // .catch(error=>{return this.processHttpmsgService.handelError(error)});
    return this.restangular.all('dishes').getList();
  }

  getDish(id:number):  Observable<Dish>{
    // return this.http.get(baseURL +'dishes/'+id)
    // .map(res =>{return this.processHttpmsgService.extractData(res)})
    // .catch(error=>{return this.processHttpmsgService.handelError(error)});
    return this.restangular.one('dishes',id).get();
  }

  getFeaturedDish():  Observable <Dish> {
    // return this.http.get(baseURL +'dishes?featured=true')
    // .map(res =>{return this.processHttpmsgService.extractData(res)[0]})
    // .catch(error=>{return this.processHttpmsgService.handelError(error)});
    return this.restangular.all('dishes').getList({featured:true})
    .map(dishes => dishes[0])
  }

  getDishsIds():Observable<number[]>{
    return this.getDishes()
    .map(dishes=>{return dishes.map(dish=>dish.id)})
    // .catch(error => { return error; } );
    // .catch(error=>{return this.processHttpmsgService.handelError(error)});

  }
}
