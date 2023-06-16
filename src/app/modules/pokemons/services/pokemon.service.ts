import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdapterService } from '@/core/services';

import { Pokemon, PokemonsResponse } from '../interfaces/pokemons.interface';

@Injectable({ providedIn: 'root' })
export class PokemonService extends AdapterService {
  baseUrl: string = 'https://pokeapi.co/api/v2';

  constructor(http: HttpClient) {
    super(http);
  }

  public getPokemons(): Observable<PokemonsResponse> {
    return this.client.get<PokemonsResponse>(`${this.baseUrl}/pokemon`).pipe(
      catchError((err) => {
        throw Error(err);
      })
    );
  }

  public getPokemonsDetail(url: string): Observable<Pokemon> {
    return this.client.get<Pokemon>(url).pipe(
      catchError((err) => {
        throw Error(err);
      })
    );
  }
}
