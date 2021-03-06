import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TicketModel} from '../../shared/ticket-model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {bidMinimumValidator} from './bid.validators';
import {BidService} from '../../shared/bid.service';

@Component({
  selector: 'app-bid-form',
  templateUrl: './bid-form.component.html',
  styleUrls: ['./bid-form.component.css'],
})
export class BidFormComponent implements OnInit, OnChanges {

  @Input() ticket: TicketModel;
  @Output() bid = new EventEmitter<void>();
  displayBidStep = true;
  form: FormGroup;
  submitted = false;
  submitSuccessAlert = false;
  submitErrorAlert = false;
  disabled = false;

  constructor(private fb: FormBuilder,
              private bidService: BidService) {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['ticket'] !== null
      && !changes['ticket'].isFirstChange()
      && changes['ticket'].currentValue !== null) {
      this.disabled = false;
      this.form.reset({bid: null});
      this.form.get('bid').enable();
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        /*bid: null, //sima verzio
         bid: [null, Validators.required], //egy validator csak*/
        bid: [
          null, Validators.compose
          (
            [
              Validators.required,
              bidMinimumValidator
              (
                () => this.ticket
              )
            ]
          )
        ] //tobb validator
      }
    );
  }

  onBidWithBidStep() {
    this.toBid(this.ticket.currentBid + this.ticket.bidStep)
      .subscribe({
          next: () => {
            this.submitSuccessAlert = true;
            this.bid.emit();
            this.form.get('bid').enable();
          },
          error: err => {
            console.error(err);
            this.submitErrorAlert = true;
          }
        }
      );
  }

  displayBidWithStep($event: Event) {
    $event.preventDefault();
    this.displayBidStep = false;
  }

  onSubmit() {
    this.submitted = false;
    if (this.form.invalid) {
      this.submitted = true;
    }
    else {
      this.toBid(this.form.value.bid)
        .subscribe({
          next: () => {
            this.submitted = false;
            this.submitSuccessAlert = true;
            this.bid.emit();
            this.displayBidStep = true;
          },
          error: err => {
            console.error(err);
            this.submitErrorAlert = true;
          }
        });
    }
  }

  toBid(value: number) {
    this.submitSuccessAlert = false;
    this.submitErrorAlert = false;
    this.form.get('bid').disable();
    this.disabled = true;
    return this.bidService.bid(this.ticket.id, value);
  }
}

