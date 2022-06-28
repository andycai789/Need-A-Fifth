import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';
import {
  trigger,
  style,
  animate,
  transition,
  query,
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        query('.settings', style({ opacity: 0, transform: 'scale(0)' })),
        query('.settings', 
          animate('400ms cubic-bezier(0.35, 0, 0.25, 1)',
            style({ opacity: 1, transform: 'none' }))
        )
      ]),
      transition(':leave', [
        query('.settings', style({ opacity: 1 })),
        query('.settings', 
          animate('500ms cubic-bezier(0.35, 0, 0.25, 1)',
            style({ opacity: 0 }))
        )
      ]),
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
