import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';
import { AuthService } from '@auth0/auth0-angular';

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
  userEmail!: string;

  constructor(public auth: AuthService) { }

  ngOnInit(): void { 
    this.auth.user$.subscribe(user => {
      this.userEmail = user!.email!;

      fetch(`/answers/${this.userEmail}`)
        .then(res => res.json())
        .then(data => {
          if (data.answers.length > 0) {
            this.answers = data.answers;

            this.answers.forEach( answer => {
              if (answer !== -1) {
                this.percentage += (100 / this.answers.length);
              }
            });
          }
        })
        .catch(error => console.error(error));
    });
  }

  recordOpinion(e: any): void {
    if (this.answers[e.valueIndex] === -1) {
      this.percentage += (100 / this.answers.length);
    }
    this.answers[e.valueIndex] = e.opinion;
  }

  submitAnswers(): void {
    fetch(`/answers/${this.userEmail}`, {
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
