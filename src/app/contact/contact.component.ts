import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validator } from "@angular/forms";
import { FeedBack,ContactType } from "../shared/feedback";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
 

  feedbackForm :FormGroup;
  feedback:FeedBack;
  contactType=ContactType;
  constructor( private fb:FormBuilder) {
    this.createForm()
   }

  ngOnInit() {
  }
  
  onSubmit():void{
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset();
  }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname:'',
      lastname:'',
      telnum:0,
      email:'',
      agree:false,
      contactType:'None',
      message:''

    });
  }

}
