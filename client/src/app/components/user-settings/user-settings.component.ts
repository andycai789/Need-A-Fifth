import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  
  riotID: string = '';
  tagline: string = '';

  rankList: string[] = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Immortal', 'Radiant' ]
  genderList: string[] = ['Male', 'Female', 'Other'];
  groupList: string[] = ['All Male', 'All Female', 'Mixed'];
  roleList: string[] = ['Controller', 'Duelist', 'Initiator', 'Sentinel']

  rank: string | string[] = '';
  gender: string | string[] = '';
  group: string | string[] = '';
  role: string | string[] = [];

  constructor(private user: UserInfoService) { }

  ngOnInit(): void {
    const data = this.user.getUserSettings();

    if (data === undefined) {
      return;
    }

    this.riotID = data.riotID;
    this.tagline = data.tagline;
    this.rank = data.rank;
    this.gender = data.gender;
    this.group = data.group;
    this.role = data.role;
  }

  getUserSettingsAsObject() {
    return {
      riotID: this.riotID,
      tagline: this.tagline, 
      rank: this.rank,
      gender: this.gender,
      group: this.group,
      role: this.role
    } 
  }

  uploadSettings() {
    const settings = this.getUserSettingsAsObject();
    this.user.setUserSettings(settings);

    fetch(`/settings/${this.user.getUserEmail()}`, {
      method: "PUT",
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          userSettings: settings
        }
      )
    })
    .catch((error) => {
      console.error('Error in uploadSettings:', error);
    });
  }
}
