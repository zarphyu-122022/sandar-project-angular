import { Component, OnInit } from '@angular/core';
import { FeedBack } from '../models/feedback.model';
import { FeedbackService } from '../service/feedback.service';

@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.css']
})
export class ManageAdminComponent implements OnInit {
 feedback :FeedBack[] =[] ;
  constructor(private feedbackService:FeedbackService) { }

  ngOnInit(): void {
   this.feedbackService.fetchAllUser()
   .subscribe(post => {
    this.feedback = post;
  })

}
}
