import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/service/feedback.service';
import {  uuidv4 } from '@firebase/util';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedback :FormGroup | any;

  constructor(private feedbackService :FeedbackService) { }

  ngOnInit(): void {
    this.feedback =new FormGroup({
      'feedback':new FormControl(null,[Validators.required])
    });

  }
  feed(feedback:FormGroup){
    const feedbackValue = { ...this.feedback.value };
    const uuid = uuidv4();
    if (!feedbackValue.feedId) feedbackValue.feedId = uuid;
    console.log(feedback)
    this.feedbackService.saveUser(feedbackValue)
    feedback.reset()
    
    
    

    
    

  }

}
