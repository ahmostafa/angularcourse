import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from "@angular/http";
import 'hammerjs';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';

import {DishService} from './services/dish.service';
import { PromotionService } from "./services/promotion.service";
import {LeaderService} from "./services/leader.service";
import { baseURL } from "./shared/baseurl";
import { ProcessHttpmsgService } from "./services/process-httpmsg.service";
import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/restConfig';

import { AppRoutingModule } from "./app-routing/app-routing.module";
import { LoginComponent } from './login/login.component';
import { HighlightDirective } from './directives/highlight.directive';
import { FeedbackService } from './services/feedback.service';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RestangularModule.forRoot(RestangularConfigFactory)
  ],
  providers: [DishService,PromotionService,LeaderService,FeedbackService,{provide:"BaseURL",useValue:baseURL},ProcessHttpmsgService],
  entryComponents:[LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
