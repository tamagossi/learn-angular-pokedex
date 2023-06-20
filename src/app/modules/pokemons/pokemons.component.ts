import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { Pokemon } from './models/pokemon';
import { PokemonService } from './services/pokemon.service';
import { Pokemon as PokemonInterface } from './interfaces/pokemons.interface';
import { BG_BASED_ON_TYPE } from '@/core/constants';
import { Result } from '@/core/interfaces';

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
  types: (Result & { bg: string })[] = [];
  textWithWhiteText: string[] = ['bug', 'fire', 'water', 'grass', 'shadow'];

  constructor(private service: PokemonService) {}

  ngOnInit() {
    this.getPokemonTypes();
    this.getPokemons();
  }

  getPokemons = (url?: string) => {
    this.loading = true;
    this.pokemonsNotFound = false;

    this.service.getPokemons(url).subscribe({
      next: (pokemonsResp) => {
        this.nextUrl = pokemonsResp.next;

        forkJoin(
          pokemonsResp.results.map((pok) => {
            return this.service.getPokemonDetail(pok.url);
          })
        ).subscribe({
          next: (pokemonResp: PokemonInterface[]) => {
            pokemonResp.forEach((resp) => {
              this.pokemons.push(new Pokemon(resp));
            });

            this.loading = false;
          },
          error: (error) => console.error(error),
        });
      },
      error: (error) => console.error(error),
    });
  };

  getMorePokemons = (): void => {
    this.getPokemons(this.nextUrl);
  };

  getPokemonTypes = (): void => {
    this.service.getPokemonTypes().subscribe({
      next: (response) => {
        this.types = response.results.map((type) => {
          return {
            ...type,
            bg: BG_BASED_ON_TYPE[type.name],
          };
        });
      },
    });
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
      .getPokemonDetail(this.service.baseUrl + `/pokemon/${this.keyword}`)
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
