import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  /* The text displayed on the button */
  @Input() label!: string;

  /* The visual style of the button: 'outline' or 'fill' */
  @Input() mode!: 'outline' | 'fill';

  /* The button type: 'submit' or 'button' */
  @Input() type!: 'submit' | 'button';

  /* The color variant of the button */
  @Input() variant!: 'danger' | 'primary' | 'warning' | 'success';

  /* Whether the button is disabled */
  @Input() isDisabled!: boolean;

  /* Emits an event when the button is clicked */
  @Output() click = new EventEmitter();

  /* Handler for the button's click event */
  onClick() {
    this.click.emit();
  }
}
