import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Subject, Observable } from 'rxjs';
import { takeUntil, distinctUntilChanged, startWith, map, filter } from 'rxjs/operators';
import { IControlItem, Value } from '@app/models/frontend/';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers:  [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=> AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() items!: IControlItem[];
  @Input() placeholder!: string;
  @Output() changed = new EventEmitter<Value>();

  formControl = new FormControl();

  // $ identifier a observable object
  options$!: Observable<IControlItem[]>;

  private destroy = new Subject<any>();

  constructor() { }

  ngOnInit(): void {
    this.options$ = this.formControl.valueChanges.pipe(
      startWith(''),
      filter(value => typeof value === 'string' || typeof value === 'object' ),
      map(value => typeof value === 'string' ? value : value.lbale),
      map(label => label ? this.filter(label) : this.items.slice())
    )

    this.formControl.valueChanges.pipe(
      takeUntil(this.destroy),
      distinctUntilChanged()
    ).subscribe(item => {
      const value = typeof item === 'object' ? item.value : null;
      this.propagateChange(value);
      this.changed.emit(value);

    })
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  private filter(value: string): IControlItem[]{
    const filterValue = value.toLowerCase();
    return this.items.filter(items => items.label.toLowerCase().includes(filterValue));
  }

  private propagateChange: any = () =>{}
  private propagateTouched: any = () =>{}

  writeValue(value: Value): void {
    const selectedOption = this.items.find(item => item.value === value);
    this.formControl.setValue(selectedOption);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void{
   if(isDisabled){
     this.formControl.disable();
   }else{
     this.formControl.enable();
   }
  }

  displayFn(item?: IControlItem): string {
    return item ? item.label : '';
  }

  onBlur(): void {
    this.propagateTouched();
  }

/*   onChanged():void{
    const value = {...this.form.value};
    this.propagateChange(value);
    this.changed.emit(value);

  } */

}
