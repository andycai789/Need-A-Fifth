import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userInfo: UserInfoService) { 
    
  }

  ngOnInit(): void {

  }

  getUserEmail(): string {
    return this.userInfo.email;
  }


}
