import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import "rxjs-compat/add/operator/distinctUntilChanged";
import "rxjs-compat/add/operator/skip";


@Component({
  selector: 'app-chat-message-send-form',
  templateUrl: './chat-message-send-form.component.html',
  styleUrls: ['./chat-message-send-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageSendFormComponent implements OnInit, OnChanges {

  form: FormGroup;
  invalidChatMessageInput = false;
  @ViewChild('chatMessageInput')
  chatMessageInput: ElementRef;
  @Output() newMessage = new EventEmitter<string>();
  @Input() reset = false;
  @Output() resetChange = new EventEmitter<boolean>();
  private _disabled = false;

  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
    if (value === true) {
      this.form.get('chat-message').disable();
    } else {
      this.form.get('chat-message').enable();
    }
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reset'] != null && changes['reset'].isFirstChange() === false && changes['reset'].currentValue === true) {
      this.disabled = false;
      this.form.reset({'chat-message': null});
      this.chatMessageInput.nativeElement.focus();
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      'chat-message': [null, Validators.required]
    });
    this.form.get('chat-message')
      .valueChanges
      .distinctUntilChanged(
        msg => {
          return !(msg.length > 0 && this.invalidChatMessageInput);
        }
      )
      .skip(1)
      .subscribe(
        msg => this.invalidChatMessageInput = false
      );
  }

  sendMessage() {
    if (this.form.invalid) {
      this.invalidChatMessageInput = true;
      this.chatMessageInput.nativeElement.focus();
    } else {
      this.disabled = true;
      this.resetChange.emit(false);
      this.newMessage.emit(this.form.value['chat-message']);
    }
  }
}
