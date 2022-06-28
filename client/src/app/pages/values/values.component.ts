import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';
import { UserInfoService } from 'src/app/services/user-info.service';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
  group,
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css'],
  animations: [
    trigger('flowUp', [
      transition(':enter', [

        query('.statement', [
          style({opacity: 0, transform: 'translateY(-300px)' })
        ]),
        query('.bubble', [
          style({opacity: 0, transform: 'translate(0px, -300px)' })
        ]),
        query('.divider', [
          style({opacity: 0, width: '0px', transform: 'translateY(200px)'})
        ]),
 
        group([
          query('.statement', stagger(500, [
            animate('400ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'none' }))
          ])),
          query('.bubble', stagger(60, [
            animate('400ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'none' }))
          ])),
        ]),
        query('.divider', stagger(200, [
          animate('1000ms cubic-bezier(0.35, 0, 0.25, 1)',
            style({ opacity: 1, width: "90%", transform: 'none' }))
        ])) 
      ])
    ]),

    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: 0, transform: 'scale(0)' }),
        animate('400ms cubic-bezier(0.35, 0, 0.25, 1)',
        style({ opacity: 1, transform: 'none' }))
      ])
    ])
  ]
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

  constructor(private userInfo: UserInfoService, private router: Router) { }

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

    this.router.navigate(['/search']);
  }
}
