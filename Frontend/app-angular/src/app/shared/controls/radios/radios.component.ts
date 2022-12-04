import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Value, IControlItem } from '@app/models/frontend';

@Component({
  selector: 'app-radios',
  templateUrl: './radios.component.html',
  styleUrls: ['./radios.component.scss'],
  providers:  [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=> RadiosComponent),
      multi: true
    }
  ]
})

export class RadiosComponent implements OnInit, ControlValueAccessor {

  value!: Value;
  isDisabled!: boolean;
  @Output() changed = new EventEmitter<Value>();
  @Input() items!: IControlItem[];

  constructor() { }


  private propagateChange: any = () =>{}
  private propagateTouched: any = () =>{}



  ngOnInit(): void {
  }

  writeValue(value: Value): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void{
    this.isDisabled = isDisabled;
  }

  onChanged(value: Value):void {
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }

  isChecked(value: Value):boolean {
    return this.value === value;
  }

}
