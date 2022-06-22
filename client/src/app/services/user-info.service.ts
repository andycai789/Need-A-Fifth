import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  email!: string;
  info!: any;
  isLoaded: boolean = false;

  constructor(private auth: AuthService) { 
    this.auth.user$.subscribe(user => {
      this.email = user!.email!;

      fetch(`/userData/${this.email}`)
        .then(res => res.json())
        .then(data => {
          this.info = data;
          this.isLoaded = true;          
        })
        .catch(error => console.error(error));
    });
  }

  getUserEmail() {
    return this.email;
  }

  getUserSettings() {
    return this.info.userSettings;
  }

  getGroupSettings() {
    return this.info.groupSettings;
  }

  getAnswers() {
    return this.info.answers;
  }

  setUserSettings(settings: any) {
    this.info.userSettings = settings;
  }

  setGroupSettings(settings: any) {
    this.info.groupSettings = settings;
  }

  setAnswers(answers: any) {
    this.info.answers = answers;
  }
}
