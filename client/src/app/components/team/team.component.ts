import { Component, Input, OnInit } from '@angular/core';

interface TeamInfo {
  riotID: string;
  tagline: string;
  groupType: string;
  role: string[];
  values: string[];
}

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  @Input() team!: TeamInfo;

  constructor() { }

  ngOnInit(): void {
  }

}
