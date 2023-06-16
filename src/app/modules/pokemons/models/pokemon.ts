import { BG_BASED_ON_TYPE } from '@/core/constants';
import { Pokemon as PokemonInterface } from '../interfaces/pokemons.interface';

export class Pokemon {
  bg: string;
  id: number;
  name: string;
  types: string[];

  constructor(pokemon: PokemonInterface) {
    this.bg = BG_BASED_ON_TYPE[pokemon.types[0].type.name];
    this.id = pokemon.id;
    this.name = pokemon.name;
    this.types = pokemon.types.map((type) => type.type.name);
  }
}
