import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';

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
    "Value 6",
    "Value 7",
    "Value 8",
    "Value 9",
    "Value 10",
    "Value 11",
    "Value 12",
    "Value 13",
    "Value 14",
    "Value 15",
  ]

  answers: number[] = Array(this.values.length).fill(-1)

  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  percentage = 0;

  constructor() { }

  ngOnInit(): void {
  }

  recordOpinion(e: any): void {
    if (this.answers[e.valueIndex] === -1) {
      this.percentage += (100 / this.answers.length);
    }

    this.answers[e.valueIndex] = e.opinion;
  }

  submitAnswers(): void {
    this.answers.forEach((answer, index) => {
      if (answer === -1) {
        this.answers[index] = 3;
      }
    });

    fetch('/answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.answers),
    })
      .then(response => response.json())
      .then(data => console.log(data))
  }
}
