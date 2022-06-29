import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-teammates',
  templateUrl: './teammates.component.html',
  styleUrls: ['./teammates.component.css']
})
export class TeammatesComponent implements OnInit {

  constructor(public userInfo: UserInfoService) { }

  ngOnInit(): void {
  }

}
