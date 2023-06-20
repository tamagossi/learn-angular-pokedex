import { Result } from '@/core/interfaces';

export interface TypeResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Result[];
}

export interface Type {
  damage_relations: DamageRelations;
  game_indices: Index[];
  generation: Result;
  id: number;
  move_damage_class: Result;
  moves: Result[];
  name: string;
  names: Name[];
  past_damage_relations: PastDamageRelation[];
  pokemon: Pokemon[];
}

export interface DamageRelations {
  double_damage_from: Result[];
  double_damage_to: Result[];
  half_damage_from: Result[];
  half_damage_to: Result[];
  no_damage_from: any[];
  no_damage_to: any[];
}

export interface Index {
  game_index: number;
  generation: Result;
}

export interface Name {
  language: Result;
  name: string;
}

export interface PastDamageRelation {
  damage_relations: DamageRelations2;
  generation: Result;
}

export interface DamageRelations2 {
  double_damage_from: Result[];
  double_damage_to: Result[];
  half_damage_from: Result[];
  half_damage_to: Result[];
  no_damage_from: any[];
  no_damage_to: any[];
}

export interface Pokemon {
  pokemon: Result;
  slot: number;
}
