import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input() isAvailable!: boolean;
  @Input() id!: string;
  @Input() team!: TeamInfo;
  @Output() rejectEvent = new EventEmitter<string>();

  constructor(private socket: Socket) { }

  ngOnInit(): void {
  }

  acceptInvitation(): void {
    this.socket.emit("sendAcceptanceFromPlayer", this.id);
  }

  rejectInvitation(): void {
    this.rejectEvent.emit(this.id)
  }

}
