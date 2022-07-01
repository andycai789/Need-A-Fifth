import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';

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

  opinionTypes: string[] = [
    "Disagree Strongly",
    "Disagree",
    "Disagree Somewhat",
    "Neutral",
    "Agree Somewhat",
    "Agree",
    "Agree Strongly"
  ];

  values: string[] = [
    "My rank is important to me.",
    "After a loss, I can play another game without dwelling on the past.",
    "I prefer people who can verbally speak to me.",
    "I do not mind people who communicate through text.",
    "I enjoy playing in a setting where there is a focus on winning.",
    "I can still enjoy the game even when I am losing.",
  ];

  shortenedValues: string[] = [
    "Rank Important",
    "Untiltable",
    "Must have a mic",
    "Will read chat",
    "Competitive",
    "Casual",
  ];

  constructor(private socket: Socket) { }

  ngOnInit(): void {
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
