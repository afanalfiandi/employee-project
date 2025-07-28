import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { APP_ICONS } from '../../consts/icons.const';

@Component({
  selector: 'app-button-icon',
  imports: [NgIcon],
  templateUrl: './button-icon.component.html',
  styleUrl: './button-icon.component.css',
  providers: [provideIcons(APP_ICONS)]

})
export class ButtonIconComponent {
  @Output() click = new EventEmitter();
  @Input() icon!: keyof typeof APP_ICONS;
  @Input() disabled: boolean = false;

  onClick() {
    this.click.emit();
  }
}
