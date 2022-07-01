import { Component, Input, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { UserInfoService } from 'src/app/services/user-info.service';

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
  opinionTypes!: string[] 
  values!: string[] 
  shortenedValues!: string[] 

  constructor(private socket: Socket, private userInfo: UserInfoService) { }
  
  ngOnInit(): void {
    this.opinionTypes = this.userInfo.opinionTypes;
    this.values = this.userInfo.values;
    this.shortenedValues = this.userInfo.shortenedValues;
  }

  sendInvitation(): void {
    this.socket.emit('sendInvitationFromGroup', this.id);
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
}
