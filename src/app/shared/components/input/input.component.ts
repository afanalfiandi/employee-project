// Import necessary Angular core and forms modules
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
  standalone: true, // This component is standalone, not part of an NgModule
  imports: [CommonModule, ReactiveFormsModule], // Import necessary modules
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent implements ControlValueAccessor, OnInit {
  // Input properties for configuring the input component externally
  @Input() label!: string;
  @Input() type: 'text' | 'number' | 'password' | 'textarea' | 'datetime-local' = 'text';
  @Input() placeholder!: string;
  @Input() form!: FormGroup;
  @Input() formControlName!: string;

  // Form control instance
  control: FormControl<any> | null = null;
  // Reference to Angular's NgControl if used inside a form
  private ngControl: NgControl | null = null;

  // Local value and disabled state
  value: any;
  isDisabled: boolean = false;

  constructor(@Optional() @Self() ngControl: NgControl) {
    this.ngControl = ngControl;
    // Set this component as the value accessor for the control
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    // Initialize the form control based on the form group and control name
    this.control = this.form?.get(this.formControlName)! as FormControl<any>;
  }

  // ControlValueAccessor implementation methods
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

  // Default implementations for change and touch events
  onChange: (value: any) => void = () => { };
  onTouched: () => void = () => { };

  // Trigger value change and touched state when user inputs
  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.onChange(input.value);
    this.onTouched();
  }

  // Utility getter to get current datetime in 'datetime-local' format
  get nowDatetimeLocal(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${date}T${hour}:${minute}`;
  }
}
