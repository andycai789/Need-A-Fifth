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
    this.socket.disconnect();
  }

  connectAsPlayer(): void {
    this.reconnect();
    this.socket.emit("playerOnline", {...this.user.info.userSettings, values: this.user.info.answers});
    this.socket.on('receiveInvitation', (newGroup: any) => {
      console.log(newGroup);
      this.groups = this.groups.concat(newGroup)
    });
  }

  connectAsGroup(): void {
    this.reconnect();
    this.socket.emit("groupOnline", {...this.user.info.groupSettings, values: this.user.info.answers});
    this.socket.on('sendPlayers', (newPlayers: any) => {
      console.log(newPlayers);
      this.players = this.players.concat(newPlayers);
    });
  }

  reconnect(): void {
    this.socket.disconnect();
    this.socket.connect();
  }

  emitGetPlayers(): void {
    this.socket.emit("getPlayers");
  }

}
