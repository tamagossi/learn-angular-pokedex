import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { Pokemon } from './models/pokemon';
import { PokemonService } from './services/pokemon.service';
import { Pokemon as PokemonInterface } from './interfaces/pokemons.interface';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
})
export class PokemonsComponent implements OnInit {
  keyword?: string = '';
  loading: boolean;
  nextUrl?: string;
  pokemons: Pokemon[] = [];
  tooltipOpen: boolean = false;
  pokemonsNotFound: boolean = false;
  typeWithBlacktext: string[] = [
    'normal',
    'electric',
    'psychic',
    'rock',
    'ghost',
    'ground',
    'ice',
    'fighting',
    'steel',
  ];

  constructor(private service: PokemonService) {}

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons = (url?: string) => {
    this.loading = true;
    this.pokemonsNotFound = false;

    this.service.getPokemons(url).subscribe((pokemonsResp) => {
      this.nextUrl = pokemonsResp.next;

      forkJoin(
        pokemonsResp.results.map((pok) => {
          return this.service.getPokemonsDetail(pok.url);
        })
      ).subscribe((pokemonResp: PokemonInterface[]) => {
        pokemonResp.forEach((resp) => {
          this.pokemons.push(new Pokemon(resp));
        });

        this.loading = false;
      });
    });
  };

  getMorePokemons = (): void => {
    this.getPokemons(this.nextUrl);
  };

  setKeyword = (event: any): void => {
    this.keyword = event.target.value;
  };

  search = (): void => {
    if (this.keyword === '') {
      this.getPokemons();
      return;
    }

    this.loading = true;
    this.nextUrl = undefined;
    this.pokemonsNotFound = false;

    this.service
      .getPokemonsDetail(this.service.baseUrl + `/pokemon/${this.keyword}`)
      .subscribe({
        next: (response) => {
          this.pokemons = [new Pokemon(response)];
          this.loading = false;
        },
        error: () => {
          this.pokemonsNotFound = true;
          this.loading = false;
        },
      });
  };
}
