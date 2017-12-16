import { Injectable } from '@angular/core';
import {FeedBack} from '../shared/feedBack';
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
export class FeedbackService {

  constructor(private restangular:Restangular, private processHttpmsgService:ProcessHttpmsgService) { }
  getFeedbacks():  Observable<FeedBack[]> {
        return this.restangular.all('feedback').getList();
      }

      submitFeedback(feedback: FeedBack): Observable<FeedBack[]> {
        
        console.log(feedback);
        
         this.restangular.all('feedback').post(feedback);
        return this.restangular.all('feedback').getList();
        }
  
    getLastFeedback(): Observable<FeedBack> {
          return this.restangular.all('feedback').getList()
            .map(feedback => feedback[feedback.length - 1]);
          }
        
        
      
}
