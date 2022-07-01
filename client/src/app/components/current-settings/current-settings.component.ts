import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-current-settings',
  templateUrl: './current-settings.component.html',
  styleUrls: ['./current-settings.component.css']
})
export class CurrentSettingsComponent implements OnInit {

  @Input() isFindingTeammate: boolean = false;
  @Input() settings: any;
  
  opinionTypes!: string[] 
  values!: string[] 
  shortenedValues!: string[] 
  answers!: number[];

  constructor(private router: Router, public userInfo: UserInfoService) { }

  ngOnInit(): void {
    this.opinionTypes = this.userInfo.opinionTypes;
    this.values = this.userInfo.values;
    this.shortenedValues = this.userInfo.shortenedValues;
    this.answers = this.userInfo.getAnswers();
  }

  getOpinionText(value: any): string {
    if (value === -1) {
      return "N/A";
    }
    return this.opinionTypes[parseInt(value)];
  }

  getChipColor(value: any): string {
    value = parseInt(value);

    if (value < 0 || value === 3) {
      return "";
    } else if (value < 3) {
      return "disagree";
    } else {
      return "agree";
    }
  }
  
  navigateToSettings(): void {
    this.router.navigate(['/userSettings']);
  }
}
