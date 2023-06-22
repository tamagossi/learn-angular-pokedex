import { Component, Input } from '@angular/core';
import { textWithWhiteText } from '../../contstants/textWithWhiteText';

@Component({
  selector: 'app-type-badge',
  template: `
    <p
      class="text-center text-lg font-semibold rounded-full p-1 px-5"
      [ngClass]="{
        'text-white': textWithWhiteText.includes(typeColor),
        'bg-white/25': textWithWhiteText.includes(typeColor),
        'text-black/50': !textWithWhiteText.includes(typeColor),
        'bg-black/5': !textWithWhiteText.includes(typeColor),
      }"
    >
      {{ type | titlecase }}
    </p>
  `,
})
export class TypeBadgeComponent {
  @Input() type: string;
  @Input() typeColor: string;

  textWithWhiteText = textWithWhiteText;
}
