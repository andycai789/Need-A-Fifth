import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';
import { UserInfoService } from 'src/app/services/user-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css']
})
export class ValuesComponent implements OnInit {
  values: string[] = [
    "My rank is important to me.",
    "After a loss, I can play another game without dwelling on the past.",
    "I prefer people who can verbally speak to me.",
    "I do not mind people who communicate through text.",
    "I enjoy playing in a setting where there is a focus on winning.",
    "I can still enjoy the game even when I am losing.",
  ];

  answers!: number[];
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  percentage: number = 0;

  constructor(public userInfo: UserInfoService, private router: Router) { }

  ngOnInit(): void { 
    this.answers =  this.userInfo.getAnswers();
    this.answers.forEach( answer => {
      if (answer !== -1) {
        this.percentage += (100 / this.answers.length);
      }
    });
  }
  
  recordOpinion(e: any): void {
    if (this.answers[e.valueIndex] === -1) {
      this.percentage += (100 / this.answers.length);
    }
    this.answers[e.valueIndex] = e.opinion;
  }

  submitAnswers(): void {
    this.userInfo.setAnswers(this.answers);

    fetch(`/answers/${this.userInfo.getUserEmail()}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({answers: this.answers}),
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    this.router.navigate(['/search']);
  }
}
