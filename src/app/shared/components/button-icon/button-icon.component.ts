import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { APP_ICONS } from '../../consts/icons.const';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-icon',
  imports: [NgIcon, CommonModule],
  templateUrl: './button-icon.component.html',
  styleUrl: './button-icon.component.css',
  // Provide the icon set used in this component
  providers: [provideIcons(APP_ICONS)]
})
export class ButtonIconComponent {
  // Emits an event when the icon button is clicked
  @Output() click = new EventEmitter();

  // Icon name to display, must match a key in APP_ICONS
  @Input() icon!: keyof typeof APP_ICONS;

  // Whether the button is disabled
  @Input() disabled: boolean = false;

  // Whether to show a border around the icon
  @Input() showBorder: boolean = true;

  // Custom color to apply to the icon
  @Input() color!: string;

  // Handler for button click event
  onClick() {
    this.click.emit();
  }
}