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

  constructor(public auth: AuthService) { }

  ngOnInit(): void {

    this.auth.user$.subscribe(user => {
      this.userEmail = user!.email!;
    });
    // fetch data for name gender preference and pictures
    // set them
    // get out of loading phases for each element
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


  thing: any;
  thinglink: any;

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

      this.thing = data;
      console.log(this.thing)

      this.thinglink = `data:${this.thing.mimetype};base64,${Buffer.from(this.thing.buffer).toString('base64')}`

      console.log(this.thinglink)
    }
      
      
      ) ;
  }
}
