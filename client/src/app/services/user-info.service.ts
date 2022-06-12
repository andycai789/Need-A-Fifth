import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  userEmail!: string;
  userData!: any;

  constructor(private auth: AuthService) { 
    this.auth.user$.subscribe(user => {
      this.userEmail = user!.email!;

      fetch(`/userData/${this.userEmail}`)
        .then(res => res.json())
        .then(data => {
          this.userData = data;
          console.log("GOT USER DATA");
          console.log(this.userData);
        })
        .catch(error => console.error(error));
    });
  }

  getUserEmail() {
    return this.userEmail;
  }

  getUserSettings() {
    return this.userData.userSettings;
  }

  getGroupSettings() {
    return this.userData.groupSettings;
  }

  getAnswers() {
    return this.userData.answers;
  }

  setUserSettings(settings: any) {
    this.userData.userSettings = settings;
  }

  setGroupSettings(settings: any) {
    this.userData.groupSettings = settings;
  }

  setAnswers(answers: any) {
    this.userData.answers = answers;
  }
}
