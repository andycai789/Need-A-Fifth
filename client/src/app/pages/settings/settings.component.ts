import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {

  mode: string = "personal";

  constructor(public auth: AuthService) { }

  ngOnInit(): void { }

}


  // uploadImages() {
  //   const formData : FormData = new FormData();

  //   this.images.forEach((image, index) => {
  //     formData.append("images", image, `${this.userEmail}-photo${index}`);
  //   });

  //   fetch(`/images/${this.userEmail}`, {
  //     method: "PUT",
  //     body: formData
  //   }).catch((error) => {
  //     console.error('Error in uploadImages:', error);
  //   });
  // }
  // addImageFile(file: File, index: number): void {
  //   this.images[index] = file;
  // }