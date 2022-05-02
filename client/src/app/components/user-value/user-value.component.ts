import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-value',
  templateUrl: './user-value.component.html',
  styleUrls: ['./user-value.component.css']
})
export class UserValueComponent implements OnInit {

  @Input() statement? : string;
  @Input() questionNumber? : number;
  @Output() opinion = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { }

  emitOpinion(e: Event): void {
    this.opinion.emit((e.target as Element).className)
  }


}
