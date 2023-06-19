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
  keyword: string = '';
  loading: boolean;
  nextUrl?: string;
  pokemons: Pokemon[] = [];
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

  getPokemons(url?: string) {
    this.loading = true;

    this.service.getPokemons(this.keyword, url).subscribe((pokemonsResp) => {
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
  }

  getMorePokemons(): void {
    this.getPokemons(this.nextUrl);
  }
}
