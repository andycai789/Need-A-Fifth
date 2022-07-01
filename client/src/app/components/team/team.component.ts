import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { UserInfoService } from 'src/app/services/user-info.service';

interface TeamInfo {
  rank: string;
  gender: string;
  role: string[];
  values: string[];
}

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  @Input() isAvailable!: boolean;
  @Input() id!: string;
  @Input() team!: TeamInfo;
  @Output() rejectEvent = new EventEmitter<string>();

  opinionTypes!: string[] 
  values!: string[] 
  shortenedValues!: string[] 

  constructor(private socket: Socket, private userInfo: UserInfoService) { }

  ngOnInit(): void {
    this.opinionTypes = this.userInfo.opinionTypes;
    this.values = this.userInfo.values;
    this.shortenedValues = this.userInfo.shortenedValues;
  }

  acceptInvitation(): void {
    this.socket.emit("sendAcceptanceFromPlayer", this.id);
  }

  rejectInvitation(): void {
    this.rejectEvent.emit(this.id)
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
