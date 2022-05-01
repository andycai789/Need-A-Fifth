import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css']
})
export class ValuesComponent implements OnInit {

  values : string[] = [
    "You believe",
    "You want",
    "You hate",
    "You something",
    "You wish"
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
