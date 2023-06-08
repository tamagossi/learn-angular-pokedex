import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  protected MENUS: { label: string; path: string }[] = [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'Pokédex',
      path: '/pokédex',
    },
    {
      label: 'Legendaries',
      path: '/legendaries',
    },
  ];

  constructor(protected router: Router) {}
}
