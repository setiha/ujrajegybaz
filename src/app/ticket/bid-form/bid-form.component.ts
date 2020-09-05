import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {TicketModel} from "../../shared/ticket-model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {bidMinimumValidator} from "./bid.validators";
import {BidService} from "../../shared/bid.service";

@Component({
  selector: 'app-bid-form',
  templateUrl: './bid-form.component.html',
  styleUrls: ['./bid-form.component.css']
})
export class BidFormComponent implements OnInit {

  @Input() ticket: TicketModel;
  @Output() bidWithBidStep = new EventEmitter<void>();
  displayBidStep = true;
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
              private bidService: BidService
  ) {}

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
                this.ticket.currentBid + this.ticket.bidStep
              )
            ]
          )
        ] //tobb validator
      }
    );
  }

  onBidWithBidStep() {
    this.bidWithBidStep.emit();
  }

  displayBidWithStep($event: Event) {
    $event.preventDefault();
    this.displayBidStep = false;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid){
     this.bidService.bid(this.ticket.id, this.form.value.bid)
       .subscribe({
         next: () => {
           this.submitted = false;
           this.form.reset({bid: null});
           // TODO notification user
           // TODO emit output bid
         },
         error: err => {
           console.error(err);
         }
       });
    }
    console.log('Licitaltak');
    console.log(this.form.value);
    console.log(this.form.valid);
  }
}

