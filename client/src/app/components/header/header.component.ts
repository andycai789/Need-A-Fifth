import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(public auth: AuthService, public route: Router) { }

  ngOnInit(): void {
  }

  routeToPath(path: string) {
    this.route.navigate([path]);
  }
}
