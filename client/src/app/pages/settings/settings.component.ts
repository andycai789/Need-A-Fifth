import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})


export class SettingsComponent implements OnInit {

  name = '';

  constructor() { }

  ngOnInit(): void {
  }

  printSettings() {
    console.log("I AM HERE");
    console.log(this.name);
  }

}
