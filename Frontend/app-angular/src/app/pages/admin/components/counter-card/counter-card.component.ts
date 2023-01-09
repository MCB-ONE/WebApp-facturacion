import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter-card',
  templateUrl: './counter-card.component.html',
  styleUrls: ['./counter-card.component.scss']
})
export class CounterCardComponent implements OnInit {

  @Input() title !: string;
  @Input() icon !: string;
  @Input() count !: string;
  @Input() countSubtitle !: string;
  @Input() link !: string;
  @Input() linkText !: string;
  @Input() buttonLink !: string;
  @Input() haveButtonAction !: boolean;
  @Input() buttonText !: string;

  @Output() buttonAction: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onButtonAction(){
    this.buttonAction.emit();
  }



}
