import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() firstName!: string;
  @Input() theirAnswers!: Array<any>;
  @Input() userAnswers!: Array<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
