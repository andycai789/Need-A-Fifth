import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-value',
  templateUrl: './user-value.component.html',
  styleUrls: ['./user-value.component.css']
})
export class UserValueComponent implements OnInit {

  @Input() statement? : string;

  constructor() { }

  ngOnInit(): void {
  }

  test(): void {
    console.log("I AM HERE")
  }


}
