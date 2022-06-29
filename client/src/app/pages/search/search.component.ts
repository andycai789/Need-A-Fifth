import { Component, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  useAnimation,
} from '@angular/animations';
import { searchEnter, searchLeave } from 'src/app/animations/searchPageAnimations';
import { Router } from '@angular/router';
import { UserInfoService } from 'src/app/services/user-info.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('slideUpDown', [
      transition(':enter', [
        useAnimation(searchEnter)
      ]),
      transition(':leave', [
        useAnimation(searchLeave)
      ]),
    ])
  ]
})
export class SearchComponent implements OnInit {

  constructor(private router: Router, private user: UserInfoService) { }

  ngOnInit(): void {}

  routeToTeams(): void {
    this.router.navigate(['/search/teams'])
  }

  routeToTeammates(): void {
    this.router.navigate(['/search/teammates'])
  }
}

