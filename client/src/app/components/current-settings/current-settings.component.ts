import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-settings',
  templateUrl: './current-settings.component.html',
  styleUrls: ['./current-settings.component.css']
})
export class CurrentSettingsComponent implements OnInit {

  @Input() isFindingTeammate: boolean = false;
  @Input() settings: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToSettings(): void {
    this.router.navigate(['/userSettings']);
  }

}
