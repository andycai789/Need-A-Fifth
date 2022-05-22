import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})


export class SettingsComponent implements OnInit {

  name: string = '';
  gender: string = '';
  preferences: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  setGender(gender: string) {
    this.gender = gender;
  }

  changePreferences(preference: string) {
    const index: number = this.preferences.indexOf(preference);

    if (index > -1) {
      this.preferences.splice(index, 1);
      this.preferences = [...this.preferences];
    } else {
      this.preferences = [...this.preferences, preference];
    }
  }

  saveSettings() {
    console.log(this.name);
    console.log(this.gender);
    console.log(this.preferences);
  }

}
