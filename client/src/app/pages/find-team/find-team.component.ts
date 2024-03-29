import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { UserInfoService } from 'src/app/services/user-info.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-team',
  templateUrl: './find-team.component.html',
  styleUrls: ['./find-team.component.css']
})
export class FindTeamComponent implements OnInit, OnDestroy {

  groups: any[] = [];
  userSettings: any;
  audio = new Audio("./../../../assets/audio/sound.mp4");

  constructor(private user: UserInfoService, private socket: Socket, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.connectAsPlayer();
    this.userSettings = this.user.getUserSettings();
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  connectAsPlayer(): void {
    this.socket.connect();

    this.socket.emit("playerOnline", {...this.user.info.userSettings, values: this.user.info.answers});
    
    this.socket.on('sendInvitationToPlayer', (newGroup: any) => {
      this.groups = this.groups.concat(newGroup);
      this.audio.play();
    });

    this.socket.on("sendAcceptanceToPlayer", (groupRiotID: string, groupTagline: string) => {
      this.openDialog(groupRiotID, groupTagline);
      this.audio.play();
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

  removeGroup(groupID: string): void {
    const index = this.groups.find(group => group.id === groupID);
    this.groups.splice(index, 1);
  }
}

export interface DialogData {
  riotID: string;
  tagline: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.html',
  styles: [
    'button { background-color: black; padding: 10px; margin-top: 10px; color: white; border-radius: 10px; border: 0px;}',
    'button:hover { background-color: gray; cursor: pointer;}'
  ]
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router
  ) {}

  returnToSearch(): void {
    this.dialogRef.close();
    this.router.navigate(['/search']);
  }
}
