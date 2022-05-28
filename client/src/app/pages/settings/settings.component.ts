import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {

  name: string = '';
  gender: string = '';
  preferences: string[] = [];
  images: File[] = [];
  userEmail!: string;
  thing: any;
  thinglink: any;
  constructor(public auth: AuthService) { }

  ngOnInit(): void {

    this.auth.user$.subscribe(user => {
      this.userEmail = user!.email!;

      fetch(`/settings/${this.userEmail}`)
        .then(res => res.json())
        .then(data => {
          this.name = data.name;
          this.gender = data.gender;
          this.preferences = data.preferences;
        })
        .catch(error => console.error(error))

      fetch(`/images/${this.userEmail}`)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          this.thing = "something";
          this.thinglink = `data:${data.type};base64,${Buffer.from(data.buffer).toString('base64')}`
        })
        .catch(error => console.error(error));
    });
  }

  isGender(gender: string) {
    return this.gender === gender;
  }

  hasPref(gender: string) {
    return this.preferences.includes(gender);
  }


  setGender(gender: any) {
    this.gender = gender.value;
    console.log(this.gender);
  }

  changePreferences(preferences: any) {
    this.preferences = preferences.value;

    console.log(this.preferences);

  }

  addImageFile(file: File, index: number): void {
    this.images[index] = file;
  }

  saveSettings() {
    this.uploadSettings();
    this.uploadImages();
  }

  uploadSettings() {
    fetch(`/settings/${this.userEmail}`, {
      method: "PUT",
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: this.name, gender: this.gender, preferences: this.preferences })
    })
    .catch((error) => {
      console.error('Error in uploadSettings:', error);
    });
  }




  uploadImages() {
    const formData : FormData = new FormData();

    this.images.forEach(image => {
      formData.append("images", image);
    });

    fetch(`/images/${this.userEmail}`, {
      method: "PUT",
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      // this.thing = data;
      // this.thinglink = `data:${this.thing.mimetype};base64,${Buffer.from(this.thing.buffer).toString('base64')}`
    });
  }
}
