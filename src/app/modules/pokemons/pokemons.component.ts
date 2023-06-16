import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { Pokemon } from './models/pokemon';
import { PokemonService } from './services/pokemon.service';
import {
  Pokemon as PokemonInterface,
  PokemonsResponse,
} from './interfaces/pokemons.interface';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
})
export class PokemonsComponent implements OnInit {
  pokemons: Pokemon[] = [];
  loading: boolean;

  constructor(private service: PokemonService) {}

  ngOnInit() {
    this.loading = true;
    this.getPokemons();
  }

  getPokemons() {
    this.service.getPokemons().subscribe((pokemonsResp) => {
      forkJoin(
        pokemonsResp.results.map((pok) => {
          return this.service.getPokemonsDetail(pok.url);
        })
      ).subscribe((pokemonResp: PokemonInterface[]) => {
        pokemonResp.forEach((resp) => {
          this.pokemons.push(new Pokemon(resp));
        });

        console.log(this.pokemons);
        this.loading = false;
      });
    });
  }
}
