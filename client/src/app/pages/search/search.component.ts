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
  isGreen = true;

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

    this.socket.on("sendAcceptanceToPlayer", (groupRiotID: string, groupTagline: string) => {
      console.log(groupRiotID);
      console.log(groupTagline);
      this.disconnect();
    });

    this.socket.on('groupUnavailable', (groupID: string) => {
      this.groups.forEach((group, index) => {
        if (group.id === groupID) {
          this.groups[index].available = false;
        }
      });
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
      this.disconnect();
    });

    this.socket.on('playerUnavailable', (playerID: string) => {
      this.players.forEach((player, index) => {
        if (player.id === playerID) {
          this.players[index].available = false;
        }
      });
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

  removeGroup(groupID: string): void {
    const index = this.groups.find(group => group.id === groupID);
    this.groups.splice(index, 1);
  }
}
