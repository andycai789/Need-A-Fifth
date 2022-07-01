import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  email!: string;
  info!: any;
  isLoaded: boolean = false;
  
  opinionTypes: string[] = [
    "Disagree Strongly",
    "Disagree",
    "Disagree Somewhat",
    "Neutral",
    "Agree Somewhat",
    "Agree",
    "Agree Strongly"
  ];

  values: string[] = [
    "My rank is important to me.",
    "After a loss, I can play another game without dwelling on the past.",
    "I prefer people who can verbally speak to me.",
    "I do not mind people who communicate through text.",
    "I enjoy playing in a setting where there is a focus on winning.",
    "I can still enjoy the game even when I am losing.",
  ];

  shortenedValues: string[] = [
    "Rank Important",
    "Untiltable",
    "Must have a mic",
    "Will read chat",
    "Competitive",
    "Casual",
  ];

  constructor(private auth: AuthService) { 
    this.auth.user$.subscribe(user => {
      this.email = user!.email!;

      fetch(`/userData/${this.email}`)
        .then(res => res.json())
        .then(data => {
          this.info = data;
          this.isLoaded = true;     
          console.log(this.info);     
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
