import { Component, OnInit } from '@angular/core';
import { BG_BASED_ON_TYPE } from '@/core/constants';
import { Result } from '@/core/interfaces';
import { forkJoin } from 'rxjs';

import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { textWithWhiteText } from '../../contstants/textWithWhiteText';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
})
export class PokemonsComponent implements OnInit {
  protected keyword?: string = '';
  protected loading: boolean;
  protected nextUrl?: string;
  protected pokemons: Pokemon[] = [];
  protected tooltipOpen: boolean = false;
  protected pokemonsNotFound: boolean = false;
  protected types: (Result & { bg: string })[] = [];
  protected textWithWhiteText = textWithWhiteText;

  constructor(protected service: PokemonService) {}

  ngOnInit() {
    this.getPokemonTypes();
    this.getPokemons();
  }

  protected getPokemons = (url?: string) => {
    this.loading = true;
    this.pokemonsNotFound = false;

    this.service.getPokemons(url).subscribe({
      next: (pokemonsResp) => {
        this.nextUrl = pokemonsResp.next;

        this.getPokemonsDetail(pokemonsResp.results.map((res) => res.url));
      },
      error: (error) => console.error(error),
    });
  };

  protected getPokemonsDetail = (urls: string[]): void => {
    forkJoin(
      urls.map((url) => this.service.getPokemonDetail({ url }))
    ).subscribe({
      next: (pokemonResp) => {
        pokemonResp.forEach((resp) => {
          this.pokemons.push(new Pokemon(resp));
        });

        this.loading = false;
      },
      error: (error) => console.error(error),
    });
  };

  protected getMorePokemons = (): void => {
    this.getPokemons(this.nextUrl);
  };

  protected getPokemonByType = (url: string): void => {
    this.pokemons = [];
    this.loading = true;
    this.nextUrl = undefined;

    this.service.getPokemonTypeDetail(url).subscribe({
      next: (response) => {
        this.getPokemonsDetail(response.pokemon.map((pok) => pok.pokemon.url));
      },
      error: (error) => console.error(error),
    });
  };

  protected getPokemonTypes = (): void => {
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

  protected setKeyword = (event: any): void => {
    this.keyword = event.target.value;
  };

  protected search = (): void => {
    if (this.keyword === '') {
      this.getPokemons();
      return;
    }

    this.loading = true;
    this.nextUrl = undefined;
    this.pokemonsNotFound = false;

    this.service
      .getPokemonDetail({
        id: this.keyword,
      })
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
