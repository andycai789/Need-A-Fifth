import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
  group,
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0)' }),
        animate('400ms cubic-bezier(0.35, 0, 0.25, 1)',
        style({ opacity: 1, transform: 'none' }))
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
