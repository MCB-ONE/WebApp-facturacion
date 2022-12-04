import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Value, IControlItem } from '@app/models/frontend';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers:  [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=> SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {

  @Input() items!: IControlItem[];
  @Input() placeholder!: string;
  @Output() changed = new EventEmitter<Value>();

  value!: Value;
  isDisabled!: boolean;

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

  onChanged(event: MatSelectChange): void{
    const value = event.value ? event.value : null;
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }

  onBlur(): void{
    this.propagateTouched();
  }

/*   onKeyUp(event: Event): void{
    const { target } = event;
    this.value = (target as HTMLInputElement).value;
    this.propagateChange(this.value);
    this.changed.emit(this.value);
  }

/*   togglePassword():void{
    this.passwordType = this.passwordType == 'password'? 'text' : 'password';
  }
 */


}
