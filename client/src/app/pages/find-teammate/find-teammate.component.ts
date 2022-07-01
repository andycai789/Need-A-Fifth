import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { UserInfoService } from 'src/app/services/user-info.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-teammate',
  templateUrl: './find-teammate.component.html',
  styleUrls: ['./find-teammate.component.css']
})
export class FindTeammateComponent implements OnInit, OnDestroy {

  players: any[] = [];

  groupSettings: any;

  constructor(private user: UserInfoService, private socket: Socket, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.connectAsGroup();
    this.groupSettings = this.user.getGroupSettings();
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  connectAsGroup(): void {
    this.socket.connect();

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

  emitRequestForPlayers(): void {
    this.socket.emit("requestPlayersFromGroup");
  }

  openDialog(riotID: string, tagline: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {riotID, tagline},
      disableClose: true
    });
  }

  disconnect(): void {
    this.socket.disconnect();
    this.socket.removeAllListeners();
  }
}

export interface DialogData {
  riotID: string;
  tagline: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.html',
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router
  ) {}

  returnToDashboard(): void {
    this.dialogRef.close();
    this.router.navigate(['/search']);
  }
}