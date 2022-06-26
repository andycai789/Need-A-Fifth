import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('flowUp', [
      state('void', style({
        transform: 'translateY(75px)',
        opacity: 0,
      })),
      state('hidden', style({
        transform: 'translateY(75px)',
        opacity: 0,
      })),
      state('reveal', style({
        opacity: 1,
      })),
      transition('void => *', [
        animate('1.0s')
      ]),
      transition('hidden => reveal', [
        animate('1.0s')
      ]),
    ])
  ]
})
export class HomeComponent implements OnInit {
  @ViewChild('thirdSection', {static: false}) 
  private thirdSection!: ElementRef<HTMLDivElement>;

  @ViewChild('fourthSection', {static: false}) 
  private fourthSection!: ElementRef<HTMLDivElement>;

  @HostListener('window:scroll', ['$event'])
  isScrolledIntoView(){
    if (this.thirdSection) {
      const rect = this.thirdSection.nativeElement.getBoundingClientRect();
      const topShown = rect.top >= 0;
      const bottomShown = rect.bottom - 400 <= window.innerHeight;
      
      if (topShown && bottomShown) {
        this.thirdSectionState = "reveal";
      }
    }

    if (this.fourthSection) {
      const rect = this.fourthSection.nativeElement.getBoundingClientRect();
      const topShown = rect.top >= 0;
      const bottomShown = rect.bottom - 400 <= window.innerHeight;
      
      if (topShown && bottomShown) {
        this.fourthSectionState = "reveal";
      }    
    }
  }
  
  thirdSectionState: string = "hidden";
  fourthSectionState: string = "hidden";

  constructor(private route: Router) {
  }

  ngOnInit(): void {}

  routeToDashboard() {
    this.route.navigate(['/dashboard']);
  }

}
