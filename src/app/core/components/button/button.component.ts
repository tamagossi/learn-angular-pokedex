import { Component, Input } from '@angular/core';

@Component({
  selector: 'custom-button',
  template: `
    <button class="relative inline-block text-lg group" (click)="onClick()">
      <span
        class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white"
      >
        <span
          class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"
        ></span>

        <span
          class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"
        ></span>

        <span class="relative">
          <ng-content></ng-content>
        </span>
      </span>

      <span
        class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
        data-rounded="rounded-lg"
      ></span>
    </button>
  `,
})
export class ButtonComponent {
  @Input() color: string;
  @Input() onClick: () => void;
}
