import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
  userEmail!: string;
  listOfGenders: string[] = ['Female', 'Male', 'Other'];
  listOfPreferences: string[] = ['Female', 'Male', 'Other'];
  name: string = '';
  gender: string = '';
  preferences: string[] = [];
  images: File[] = [];

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
  }

  setPreferences(preferences: any) {
    this.preferences = preferences.value;
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

    this.images.forEach((image, index) => {
      formData.append("images", image, `${this.userEmail}-photo${index}`);
    });

    fetch(`/images/${this.userEmail}`, {
      method: "PUT",
      body: formData
    }).catch((error) => {
      console.error('Error in uploadImages:', error);
    });
  }
}
