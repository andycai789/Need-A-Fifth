import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

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

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.userEmail = user!.email!;

      fetch(`/settings/group/${this.userEmail}`)
        .then(res => res.json())
        .then(data => {
          this.name = data.name;
          this.rank = data.rank;
          this.group = data.group;
          this.gender = data.gender;
          this.role = data.role;
        })
        .catch(error => console.error(error));
    });
  }

  uploadSettings() {
    fetch(`/settings/${this.userEmail}`, {
      method: "PUT",
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          group: {
            name: this.name, 
            rank: this.rank,
            group: this.group,
            gender: this.gender,
            role: this.role
          }
        }
      )
    })
    .catch((error) => {
      console.error('Error in uploadSettings:', error);
    });
  }


}
