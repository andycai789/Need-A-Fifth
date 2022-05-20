import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  userEmail!: string;
  userAnswers!: Array<any>;
  people!: Array<any>;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.userEmail = user!.email!;
    });

    this.findSimilarUsers();
  }

  findSimilarUsers(): void  {
    fetch('/similarUsers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: this.userEmail})
    })
    .then(res => res.json())
    .then(data => {
      this.people = data.peopleAnswers;
      this.userAnswers = data.userAnswers
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
}
