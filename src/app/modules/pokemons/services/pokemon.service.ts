import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdapterService } from '@/core/services';

import { Pokemon, PokemonsResponse } from '../interfaces/pokemons.interface';
import { Type, TypeResponse } from '../interfaces/type.interface';

@Injectable({ providedIn: 'root' })
export class PokemonService extends AdapterService {
  public baseUrl: string = 'https://pokeapi.co/api/v2';

  constructor(http: HttpClient) {
    super(http);
  }

  public getPokemons(url?: string): Observable<PokemonsResponse> {
    return this.client
      .get<PokemonsResponse>(url || `${this.baseUrl}/pokemon`, {
        params: { limit: 100 },
      })
      .pipe(
        catchError((err) => {
          throw Error(err);
        })
      );
  }

  public getPokemonDetail({
    url,
    id,
  }: {
    url?: string;
    id?: string;
  }): Observable<Pokemon> {
    return this.client
      .get<Pokemon>(url || `${this.baseUrl}/pokemon/${id}`)
      .pipe(
        catchError((err) => {
          throw Error(err);
        })
      );
  }

  public getPokemonTypeDetail(url: string): Observable<Type> {
    return this.client.get<Type>(url).pipe(
      catchError((err) => {
        throw Error(err);
      })
    );
  }

  public getPokemonTypes(): Observable<TypeResponse> {
    return this.client.get<TypeResponse>(`${this.baseUrl}/type`).pipe(
      catchError((err) => {
        throw Error(err);
      })
    );
  }
}
