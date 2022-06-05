import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  
  userEmail!: string;
  name: string = '';

  rankList: string[] = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Immortal', 'Radiant' ]
  genderList: string[] = ['Female', 'Male', 'Other'];
  groupList: string[] = ['All Female', 'All Male', 'Mixed'];
  roleList: string[] = ['Controller', 'Duelist', 'Initiator', 'Sentinel']

  rank: string | string[] = '';
  gender: string | string[] = '';
  group: string | string[] = '';
  role: string | string[] = [];

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.userEmail = user!.email!;

      fetch(`/settings/personal/${this.userEmail}`)
        .then(res => res.json())
        .then(data => {
          this.name = data.name;
          this.rank = data.rank;
          this.gender = data.gender;
          this.group = data.group;
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
          personal: {
            name: this.name, 
            rank: this.rank,
            gender: this.gender,
            group: this.group,
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
