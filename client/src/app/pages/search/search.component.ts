import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';
import { Socket } from 'ngx-socket-io';  

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  isPlayer: boolean = false;

  constructor(private user: UserInfoService, private socket: Socket) {
  }

  ngOnInit(): void {
    this.connectToServer();
    this.emitPlayerOrGroup();
    this.onSendPlayers();
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }

  connectToServer(): void {
    if (!this.socket.ioSocket.connected) {
      this.socket.connect();
    }
  }

  emitPlayerOrGroup(): void {
    if (this.isPlayer) {
      this.socket.emit("playerOnline", this.user.info.userSettings);
    } else {
      this.socket.emit("groupOnline", this.user.info.groupSettings);
    }
  }

  emitGetPlayers(): void {
    this.socket.emit("getPlayers");
  }

  onSendPlayers(): void {
    this.socket.on('sendPlayers', (players: any) => {
      console.log("HERE");

      console.log(players);
    })
  }

}
