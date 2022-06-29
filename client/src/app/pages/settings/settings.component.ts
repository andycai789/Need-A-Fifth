import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';
import { Router } from '@angular/router';
import {
  trigger,
  transition,
  useAnimation,
} from '@angular/animations';
import { settingsEnter } from 'src/app/animations/settingsPageAnimations';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        useAnimation(settingsEnter)
      ])
    ])
  ]
})

export class SettingsComponent implements OnInit {

  mode: string = "personal";

  constructor(public userInfo: UserInfoService, private router: Router) { }

  ngOnInit(): void { }

  navigateToSearch(): void {
    this.router.navigate(['/search']);
  }

}
