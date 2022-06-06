import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-value',
  templateUrl: './user-value.component.html',
  styleUrls: ['./user-value.component.css']
})
export class UserValueComponent implements OnInit {

  @Input() initialAnswer!: number;
  @Input() statement?: string;
  @Input() valueIndex?: number;
  @Output() opinion = new EventEmitter<object>();

  bubbleTypes: string[] = [
    "large disagree",
    "medium disagree",
    "small disagree",
    "neutral",
    "small agree",
    "medium agree",
    "large agree"
  ];


  constructor() { }

  ngOnInit(): void {
  }

  emitOpinion(opinionStrength: number): void {
    this.opinion.emit(
      {
        opinion: opinionStrength,
        valueIndex: this.valueIndex
      }  
    )
  }


}
