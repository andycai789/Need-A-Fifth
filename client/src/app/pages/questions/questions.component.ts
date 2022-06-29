import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';
import {
  trigger,
  transition,
  useAnimation,
} from '@angular/animations';
import { valuesEnter } from 'src/app/animations/valuesPageAnimations';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  animations: [
    trigger('fallIn', [
      transition(':enter', [
        useAnimation(valuesEnter)
      ]),
    ])
  ]
})
export class QuestionsComponent implements OnInit {

  constructor(public userInfo: UserInfoService) { }

  ngOnInit(): void {
  }

}
