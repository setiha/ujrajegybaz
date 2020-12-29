import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  SimpleChanges,
  OnChanges
} from "@angular/core";
import {ChatFriendModel} from "../model/chat-friend-model";
import {Subject} from "rxjs/Rx";
import {ChatService} from "../chat.service";
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import { timer } from 'rxjs';

@Component({
  selector: 'app-chat-friend-row',
  templateUrl: './chat-friend-row.component.html',
  styleUrls: ['./chat-friend-row.component.css']
})
export class ChatFriendRowComponent implements OnChanges, AfterViewInit {
  @Input() friend: ChatFriendModel;
  @HostBinding('class.clearfix') classClearfix = true;
  @HostBinding('class.text-muted') classTextMuted = true;
  @HostBinding('class.focused') classFocused = false;
  private focus$ = new Subject<boolean>();
  @Output() Select = new EventEmitter<ChatFriendModel>();
  @HostBinding('class.is-online') classIsOnline: boolean;
  @HostBinding('class.is-maybe-online') classIsMaybeOnline: boolean;
  @HostBinding('class.is-offline') classIsOffline: boolean;
  private maybeTimers$: Subscription[] = [];
  private maybeTimeInSeconds = 5 * 60;

  constructor(private cdr: ChangeDetectorRef,
              private chatService: ChatService) {
    this.focus$.subscribe(
      value => {
        if (value !== this.classTextMuted) {
          this.classTextMuted = value;
          this.classFocused = !value;
        }
      }
    );
  }
  ngAfterViewInit(): void {
    this.cdr.detach();
  }
  ngOnChanges(changes: SimpleChanges){

    if (changes['friend'] != null) {
      console.log(changes);
      const friend: ChatFriendModel = changes['friend'].currentValue;

      // ha van idozito akkor toroljuk
      if (this.maybeTimers$[friend.$id] != null) {
        this.maybeTimers$[friend.$id].unsubscribe();
        delete this.maybeTimers$[friend.$id];
      }

      if (friend.online === true) {
        this.setOnline();
      } else if (friend.online === false) {
        if ((moment().unix() - friend.lastOnline) > this.maybeTimeInSeconds) {
          // ha 5 percnel tovabb volt tavol akkor offline lesz
          this.setOffline();
        } else {
          this.setMaybeOnline();
          // adunk 5 percet a reconnectre, addig maybe lesz
          this.maybeTimers$[friend.$id] = timer(this.maybeTimeInSeconds * 1000)
            .subscribe(
              () => this.setOffline()
            );
        }
      }
    }
}
  @HostListener('mouseover', ['$event'])
  onHostFocus($event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.focus$.next(false);
  }

  @HostListener('mouseout', ['$event'])
  onHostBlur($event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.focus$.next(true);
  }

  @HostListener('click', ['$event'])
  onHostClick($event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.Select.emit(this.friend);
  }

  private setMaybeOnline() {
    this.classIsOnline = false;
    this.classIsMaybeOnline = true;
    this.classIsOffline = false;
    this.cdr.markForCheck();
  }
  private setOffline() {
    this.classIsOnline = false;
    this.classIsMaybeOnline = false;
    this.classIsOffline = true;
    this.cdr.markForCheck();
  }
  private setOnline() {
    this.classIsOnline = true;
    this.classIsMaybeOnline = false;
    this.classIsOffline = false;
    this.cdr.markForCheck();
  }
}
