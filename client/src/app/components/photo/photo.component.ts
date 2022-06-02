import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  userEmail!: string;
  url: string = "";
  @Input() index!: number;
  @Output() newImageFile = new EventEmitter();

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.userEmail = user!.email!;

      fetch(`/images/${this.userEmail}/${this.index}`)
        .then(res => res.json())
        .then(data => {
          console.log(this.index);
          console.log(data);
          // let x = `data:${data.type};base64,${Buffer.from(data.buffer).toString('base64')}`
        })
        .catch(error => console.error(error));
    });

  }

  selectFile(event: any): void {
    if (event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      this.newImageFile.emit(event.target.files[0]);
    }
  }
}