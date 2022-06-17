import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';
import { Socket } from 'ngx-socket-io';  

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  findTeam: boolean = true;

  constructor(private user: UserInfoService, private socket: Socket) {
  }

  ngOnInit(): void {

    if (this.findTeam) {
      this.socket.emit("playerOnline", this.user.info.userSettings);
    } else {
      this.socket.emit("groupOnline", this.user.info.groupSettings);
    }
  }


}
