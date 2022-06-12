import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css']
})
export class ValuesComponent implements OnInit {
  values: string[] = [
    "Value 1",
    "Value 2",
    "Value 3",
    "Value 4",
    "Value 5",
  ];

  answers: number[] = Array(this.values.length).fill(-1);
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  percentage: number = 0;

  constructor(private userInfo: UserInfoService) { }

  ngOnInit(): void { 
    const answers = this.userInfo.getAnswers();

    if (answers === undefined) {
      return;
    }

    if (answers.length > 0) {
      this.answers = answers;
      this.answers.forEach( answer => {
        if (answer !== -1) {
          this.percentage += (100 / this.answers.length);
        }
      });
    }
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
  }
}
