import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatChip, MatChipListChange } from '@angular/material/chips';

@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html',
  styleUrls: ['./choices.component.css']
})
export class ChoicesComponent implements OnInit {

  @Input() choices!: string | string[];
  @Output() choicesChange = new EventEmitter<string | string[]>();

  @Input() initialChoice!: string | string[];
  @Input() choicesList!: string[];
  @Input() isMultiple: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  isSelected(choice: string): boolean {
    if (this.isMultiple) {
      return this.initialChoice.includes(choice);
    }
    return this.initialChoice === choice;
  }

  toggleSelection(chip: MatChip, chipList: any) {
    chip.toggleSelected();

    if (this.isMultiple) {
      this.choices = chipList.selected.map( (c: any) => c._value)
    } else {
      this.choices = chip.value;
    }

    this.choicesChange.emit(this.choices);
  }

}
