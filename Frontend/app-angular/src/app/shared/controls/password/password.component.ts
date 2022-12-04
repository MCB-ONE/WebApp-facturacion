import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type PasswordType = 'password' | 'text';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers:  [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=> PasswordComponent),
      multi: true
    }
  ]
})
export class PasswordComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder: string = '';
  @Output() changed = new EventEmitter<string>();

  value!: string;
  isDisabled!: boolean;
  passwordType! : PasswordType;

  constructor() {
    this.passwordType = 'password';
  }

  private propagateChange: any = () =>{}
  private propagateTouched: any = () =>{}


  ngOnInit(): void {
  }


  writeValue(value: string): void {
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

  onKeyUp(event: Event): void{
    const { target } = event;
    this.value = (target as HTMLInputElement).value;
    this.propagateChange(this.value);
    this.changed.emit(this.value);
  }

  onBlur(): void{
    this.propagateTouched();
  }

  togglePassword():void{
    this.passwordType = this.passwordType == 'password'? 'text' : 'password';
  }

}
