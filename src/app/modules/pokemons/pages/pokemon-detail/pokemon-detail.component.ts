import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Pokemon } from '../../interfaces/pokemons.interface';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
})
export class PokemonDetailComponent {
  protected pokemon: Pokemon & { image: string };
  protected loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    protected service: PokemonService
  ) {}

  ngOnInit() {
    this.getPokemonDetail(this.route.snapshot.paramMap.get('id')!);
  }

  protected getPokemonDetail = (id: string): void => {
    this.service
      .getPokemonDetail({
        id,
      })
      .subscribe({
        next: (response) => {
          this.pokemon = {
            ...response,
            image: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${response.id
              .toString()
              .padStart(3, '0')}.png`,
          };

          this.loading = false;
        },
        error: () => {},
      });
  };
}
