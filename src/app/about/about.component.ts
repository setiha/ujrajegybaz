
import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],

})
export class AboutComponent implements AfterViewInit{

  constructor(private cdr: ChangeDetectorRef){

  }
  ngAfterViewInit(): void {
    this.cdr.detach();
  }
}
