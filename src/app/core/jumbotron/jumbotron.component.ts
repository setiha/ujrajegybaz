import {AfterViewChecked, Component, DoCheck, OnInit} from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css']
})
export class JumbotronComponent implements OnInit, DoCheck, AfterViewChecked {

  constructor() { }
  ngDoCheck(): void {
    console.log('Jumbotron component ngDoCheck');
  }

  ngAfterViewChecked(): void {
    console.log('Jumbotron component ngAfterViewChecked');
  }
  ngOnInit(): void {
  }

}
