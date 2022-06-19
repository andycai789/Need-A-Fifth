import { Component, Input, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

interface TeamInfo {
  riotID: string;
  tagline: string;
  rank: string;
  group: string;
  role: string[];
  values: string[];
}

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  @Input() id!: string;
  @Input() team!: TeamInfo;

  constructor(private socket: Socket) { }

  ngOnInit(): void {
  }

  acceptInvitation(): void {
    console.log(this.team.riotID);
    console.log(this.team.tagline);

    this.socket.emit("sendAcceptanceFromPlayer", this.id);

  }

  rejectInvitation(): void {
    this.socket.emit("sendRejectionFromPlayer", this.id);
  }




}
