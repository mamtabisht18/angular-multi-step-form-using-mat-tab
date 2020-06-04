import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-review',
  templateUrl: './form-review.component.html',
  styleUrls: ['./form-review.component.css']
})
export class FormReviewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit(): void {
  }

}
