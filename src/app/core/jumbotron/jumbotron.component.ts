import {AfterViewChecked, ChangeDetectionStrategy, Component, DoCheck} from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JumbotronComponent implements DoCheck, AfterViewChecked {

  constructor() { }
  ngDoCheck(): void {

  }

  ngAfterViewChecked(): void {

  }
}
