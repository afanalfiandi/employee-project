import {
  Component,
  Input,
  OnInit,
  Optional,
  Self
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NgControl
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() label!: string;
  @Input() type: 'text' | 'number' | 'password' | 'select' = 'text';
  @Input() placeholder!: string;
  @Input() form!: FormGroup;
  @Input() formControlName!: string;

  control: FormControl<any> | null = null;
  private ngControl: NgControl | null = null;

  value: any;
  isDisabled: boolean = false;

  constructor(@Optional() @Self() ngControl: NgControl) {
    this.ngControl = ngControl;
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.control = this.form?.get(this.formControlName)! as FormControl<any>;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChange: (value: any) => void = () => { };
  onTouched: () => void = () => { };

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement | HTMLSelectElement;
    this.onChange(input.value);
    this.onTouched();
  }
}
