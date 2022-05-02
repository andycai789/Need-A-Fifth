import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css']
})
export class ValuesComponent implements OnInit {


  index: number = 1;

  values: string[] = [
    "Question 1",
    "Question 2",
    "Question 3",
    "Question 4",
    "Question 5",
    "Question 6",
    "Question 7",
    "Question 8",
    "Question 9",
    "Question 10",
    "Question 11",
    "Question 12",
    "Question 13",
    "Question 14",
    "Question 15",
  ]

  constructor() { }

  ngOnInit(): void {
  }

  recordOpinion(e: string) {
    console.log(e)
  }

}
