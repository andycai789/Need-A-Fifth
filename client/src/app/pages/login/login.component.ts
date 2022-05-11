import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  clientID: string = "154586986953-ueahoscfgvpa23emnbfqgdbmovfg3bnp.apps.googleusercontent.com";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  something(): void {
    console.log("HEREaa");

    fetch('/test', {method: 'POST'})
      .then(response => {
        if (response.ok) {
          this.router.navigate(['search']);
        } else {
          console.log("FAIL");
        }
      })
      .catch(error => {
        console.log('API failure' + error);
      });
  }

}
