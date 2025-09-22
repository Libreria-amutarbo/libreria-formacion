import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

export type InputType = 'text' | 'number' | 'email' | 'password' | 'date' | 'search' | 'tel' | 'url';
export type InputSize = 's' | 'm' | 'l' | 'xl';

@Component({
  selector: 'dcx-ng-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dcx-ng-input.component.html',
  styleUrls: ['./dcx-ng-input.component.scss'],
})
export class DcxNgInputComponent implements OnInit, OnChanges {
  
  @Input() type: InputType = 'text';
  @Input() placeholder: string | null = null;
  @Input() size: InputSize = 'm';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() label: string | null = null;
  @Input() set value(val: string) {
    if (this.inputControl) {
      this.inputControl.setValue(val, { emitEvent: false });
    }
  }

  @Output() valueChange = new EventEmitter<string | null>();

  inputControl: FormControl = new FormControl('');
  isFocused: boolean = false;

  ngOnInit() {
    this.setupFormControl();
    this.setupValueChanges();
  }

  private setupFormControl() {
    const validators = [];
    if (this.required) {
      validators.push(Validators.required);
    }
    if (this.type === 'email') {
      validators.push(Validators.email);
    }
    if (this.type === 'number') {
      validators.push(Validators.pattern(/^-?[0-9]\\d*$/));
    }

    this.inputControl = new FormControl('', validators);
    
    if (this.disabled) {
      this.inputControl.disable();
    }
  }

  private setupValueChanges() {
    this.inputControl.valueChanges.subscribe(value => {
      this.valueChange.emit(value);
    });
  }

  clickInput() {
    this.isFocused = !this.isFocused;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['required'] || changes['type'] || changes['disabled']) {
      this.setupFormControl();
    }
  }
}
