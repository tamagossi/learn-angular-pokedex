import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private router: Router) {}

  public goToPokemonListPage = (): void => {
    this.router
      .navigateByUrl('/pokemons')
      .then((success) => console.log({ success }))
      .catch((error) => console.log({ error }));
  };
}
