import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.css']
})
export class GroupSettingsComponent implements OnInit {
  userEmail!: string;
  name: string = '';

  rankList: string[] = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Immortal', 'Radiant' ]
  groupList: string[] = ['All Female', 'All Male', 'Mixed'];
  genderList: string[] = ['Female', 'Male', 'Other'];
  roleList: string[] = ['Controller', 'Duelist', 'Initiator', 'Sentinel']

  rank: string | string[] = ''
  group: string | string[] = [];
  gender: string | string[] = '';
  role: string | string[] = [];

  constructor(private userInfo: UserInfoService) { }

  ngOnInit(): void {
    const data = this.userInfo.getGroupSettings();

    if (data === undefined) {
      return;
    }

    this.name = data.name;
    this.rank = data.rank;
    this.group = data.group;
    this.gender = data.gender;
    this.role = data.role;
  }

  getGroupSettingsAsObject() {
    return {
      name: this.name, 
      rank: this.rank,
      group: this.group,
      gender: this.gender,
      role: this.role
    }
  }

  uploadSettings() {
    const settings = this.getGroupSettingsAsObject();
    this.userInfo.setGroupSettings(settings);

    fetch(`/settings/${this.userInfo.getUserEmail()}`, {
      method: "PUT",
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          groupSettings: settings
        }
      )
    })
    .catch((error) => {
      console.error('Error in uploadSettings:', error);
    });
  }
}
