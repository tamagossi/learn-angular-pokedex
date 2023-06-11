import { Component, Input } from '@angular/core';

@Component({
  selector: 'custom-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() color: string;
  @Input() onClick: () => void;
}
