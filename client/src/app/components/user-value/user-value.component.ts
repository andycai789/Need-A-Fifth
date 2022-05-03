import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-value',
  templateUrl: './user-value.component.html',
  styleUrls: ['./user-value.component.css']
})
export class UserValueComponent implements OnInit {

  @Input() statement? : string;
  @Input() valueIndex? : number;
  @Output() opinion = new EventEmitter<object>();

  constructor() { }

  ngOnInit(): void { }

  emitOpinion(opinionStrength: number): void {
    this.opinion.emit(
      {
        opinion: opinionStrength,
        valueIndex: this.valueIndex
      }  
    )
  }


}
