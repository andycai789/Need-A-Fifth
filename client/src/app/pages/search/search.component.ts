import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';
import { Socket } from 'ngx-socket-io';  
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  players: any[] = [];
  groups: any[] = [];
  isGreen = true;

  constructor(private user: UserInfoService, private socket: Socket, public dialog: MatDialog) { }

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
      this.openDialog(groupRiotID, groupTagline);
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
      this.openDialog(playerRiotID, playerTagline);
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


  openDialog(riotID: string, tagline: string): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {riotID, tagline},
    });
  }
}

export interface DialogData {
  riotID: string;
  tagline: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router
  ) {}

  returnToDashboard(): void {
    this.dialogRef.close();
    this.router.navigate(['/dashboard']);
  }
}