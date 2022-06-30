import { Component, Input, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { MatChip } from '@angular/material/chips';

interface TeammateInfo {
  rank: string;
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

  @Input() isAvailable!: boolean;
  @Input() id!: string;
  @Input() teammate!: TeammateInfo;

  clicked = false;
  opinionTypes: string[] = [
    "Strongly Disagree",
    "Disagree",
    "Somewhat Disagree",
    "Neutral",
    "Somewhat Agree",
    "Agree",
    "Strongly Agree"
  ];

  constructor(private socket: Socket) { }
  
  ngOnInit(): void {

  }

  sendInvitation(): void {
    this.socket.emit('sendInvitationFromGroup', this.id);
  }

  convertValueToOpinion(value: any): string {
    if (value === -1) {
      return "N/A";
    }
    return this.opinionTypes[parseInt(value)];
  }

}
