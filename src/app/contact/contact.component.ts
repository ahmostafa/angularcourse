import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder,FormGroup,Validator } from "@angular/forms";
import { FeedBack,ContactType } from "../shared/feedback";
import { Validators } from '@angular/forms';
import { flyInOut,expand } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host:{
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations:[
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {
 

  feedbackForm :FormGroup;
  feedback:FeedBack;
  feedbackSub=null;
  feedbacks:FeedBack[];
  feedbacksCopy=null;
  contactType=ContactType;
  showSpinner=false;
  formErrors={
    'firstname':'',
    'lastname':'',
    'telnum':'',
    'email':''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  constructor( private fb:FormBuilder,private feedbackService:FeedbackService,@Inject('BaseURL')private BaseURL) {
    this.createForm();
    // this.feedbackService.getFeedbacks()
    // .subscribe( feedbacks=> {console.log(feedbacks.length+ " AH2M");this.feedbacks=feedbacks;this.feedbacksCopy=feedbacks });

   }

  ngOnInit() {
  }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      lastname:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      telnum:['',[Validators.required,Validators.pattern]],
      email:['',[Validators.required,Validators.email]],
      agree:false,
      contacttype:'None',
      message:''

    });
    this.feedbackForm.valueChanges
    .subscribe(data=>this.onValueChanged(data));

    this.onValueChanged();// reset validation
  }
  onSubmit():void{
    this.feedback = this.feedbackForm.value;
    // console.log(this.feedbacksCopy+ " AHM3")
    // this.feedbacksCopy.push(this.feedback);
    // this.feedbacksCopy.save()
    // .subscribe(feedback =>this.feedbackSub=feedback);
    this.feedbackSub=null;
    this.feedbackService.submitFeedback(this.feedback);
    this.showSpinner=true;
    this.feedbackService.getLastFeedback().subscribe(feedback=>{this.feedbackSub=feedback;console.log(this.feedbackSub.firstname+"AHM8");
    this.showSpinner=false;
    setTimeout(()=>{
        this.feedbackSub=null;
      },5000);
      
    });
    
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

  onValueChanged(data?: any):void{
    if(!this.feedbackForm){return;}
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
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
