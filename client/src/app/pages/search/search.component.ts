import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';
import { Socket } from 'ngx-socket-io';  

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  players: any[] = [];
  groups: any[] = [];

  constructor(private user: UserInfoService, private socket: Socket) { }

  ngOnInit(): void { 
  
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  connectAsPlayer(): void {
    this.reconnect();
    this.socket.emit("playerOnline", {...this.user.info.userSettings, values: this.user.info.answers});
    this.socket.on('sendInvitationToPlayer', (newGroup: any) => {
      console.log(newGroup);
      this.groups = this.groups.concat(newGroup);
    });
  }

  connectAsGroup(): void {
    this.reconnect();
    this.socket.emit("groupOnline", {...this.user.info.groupSettings, values: this.user.info.answers});
    this.socket.on('sendPlayersToGroup', (newPlayers: any) => {
      console.log(newPlayers);
      this.players = this.players.concat(newPlayers);
    });
    this.socket.on('sendAcceptanceToGroup', (playerRiotID: string, playerTagline: string) => {
      console.log(playerRiotID);
      console.log(playerTagline);
      // problem is when a player or group is accepted by other players/groups
      // this will lead to a hole in the map and lead to errors
      this.disconnect();
    });

    this.socket.on('sendRejectionToGroup', (playerID: any) => {
      console.log("REJECTION FROM");
      console.log(playerID);
      // find id in data structure
      // set the thing to gray or something
    });
  }

  reconnect(): void {
    this.socket.disconnect();
    this.socket.removeAllListeners();
    this.socket.connect();
  }

  disconnect(): void {
    this.socket.disconnect();
    this.socket.removeAllListeners();
  }

  emitRequestForPlayers(): void {
    this.socket.emit("requestPlayersFromGroup");
  }

}
