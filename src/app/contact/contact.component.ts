import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validator } from "@angular/forms";
import { FeedBack,ContactType } from "../shared/feedback";
import { Validators } from '@angular/forms';

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

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      telnum:[0,Validators.required],
      email:['',Validators.required],
      agree:false,
      contacttype:'None',
      message:''

    });
  }
  onSubmit():void{
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname:'',
      lastname:'',
      telnum:'',
      email:'',
      agree:false,
      contacttype:'None',
      message:''
    });
  }
 

}
