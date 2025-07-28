import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() mode!: 'outline' | 'fill';
  @Input() type!: 'submit' | 'button';
  @Input() variant!: 'danger' | 'primary' | 'warning' | 'success';
  @Input() isDisabled!: boolean;
}
