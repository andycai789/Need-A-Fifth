import { Component, Input, OnInit } from '@angular/core';

interface TeammateInfo {
  riotID: string;
  tagline: string;
  gender: string;
  role: string[];
  values: string[];
}

@Component({
  selector: 'app-teammate',
  templateUrl: './teammate.component.html',
  styleUrls: ['./teammate.component.css']
})
export class TeammateComponent implements OnInit {

  @Input() teammate!: TeammateInfo;

  constructor() { }
  
  ngOnInit(): void {
  }

}
