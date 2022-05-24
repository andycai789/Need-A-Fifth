import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  url: string = "";
  @Output() newImageFile = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    if (event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      this.newImageFile.emit(event.target.files[0]);
    }
  }
}