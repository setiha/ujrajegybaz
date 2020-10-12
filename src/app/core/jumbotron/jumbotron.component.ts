import {AfterViewChecked, ChangeDetectionStrategy, Component, DoCheck, OnInit} from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JumbotronComponent implements DoCheck, AfterViewChecked {

  constructor() { }
  ngDoCheck(): void {
    console.log('Jumbotron component ngDoCheck');
  }

  ngAfterViewChecked(): void {
    console.log('Jumbotron component ngAfterViewChecked');
  }
}
