import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Value, IControlItem } from '@app/models/frontend';

@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.scss'],
  providers:  [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=> CheckboxesComponent),
      multi: true
    }
  ]
})
export class CheckboxesComponent implements OnInit, ControlValueAccessor {

  @Input() items!: IControlItem[];
  @Output() changed = new EventEmitter<Value[]>();

  value!: Value[];
  isDisabled!: boolean;

  constructor() { }

  private propagateChange: any = () =>{}
  private propagateTouched: any = () =>{}


  ngOnInit(): void {
  }

  writeValue(value: Value[]): void {
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

  onChanged(value: Value, checked: Event):void{
    const { target } = checked;
    const result = (target as HTMLInputElement).checked;
    const selected = this.getSelected(value, result);
    this.value = selected;
    this.propagateChange = selected;
    this.changed.emit(selected);
  }

  /* This method return a colection of selected checkedboxes */
  private getSelected(value: Value, checked: Boolean): Value[] {
    const selected: Value[] = this.value ? [...this.value] : [];
    if(checked){
      if(!selected.includes(value)){
        selected.push(value);
      }
    }else{
      const index = selected.indexOf(value);
      selected.splice(index, 1);
    }

    return selected.length ? selected : [];

  }

  isChecked(value: Value){
    return this.value && this.value.includes(value);
  }

}
