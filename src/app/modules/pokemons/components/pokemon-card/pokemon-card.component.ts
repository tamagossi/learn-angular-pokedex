import { textWithWhiteText } from './../../contstants/textWithWhiteText';
import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  template: `
    <div (click)="gotToPokemonDetailPage()">
      <div class="flex flex-col justify-between items-start">
        <h3
          class="font-semibold break-words text-4xl z-10"
          [ngClass]="{
            'text-white': textWithWhiteText.includes(pokemon.types[0]),
            'text-black/50': !textWithWhiteText.includes(pokemon.types[0])
          }"
        >
          {{ pokemon.name | titlecase }}
        </h3>

        <h5 class="text-black font-semibold text-4xl opacity-10">
          #{{ pokemon.id.toString().padStart(3, '0') }}
        </h5>
      </div>

      <div class="flex justify-between relative items-end">
        <img
          class="opacity-5 absolute right-[-70px] bottom-[-70px]"
          height="400px"
          width="400px"
          src="assets/images/pokeball.png"
        />

        <div class="flex flex-col gap-2">
          <ng-template ngFor let-type [ngForOf]="pokemon.types">
            <app-type-badge
              [type]="type"
              [typeColor]="pokemon.types[0]"
            ></app-type-badge>
          </ng-template>
        </div>

        <img
          height="140px"
          width="140px"
          [alt]="pokemon.name | titlecase"
          [src]="pokemon.image"
        />
      </div>
    </div>
  `,
})
export class PokemonCardComponent {
  @Input() pokemon: Pokemon;
  textWithWhiteText = textWithWhiteText;

  constructor(private router: Router) {}

  public gotToPokemonDetailPage = (): void => {
    this.router
      .navigateByUrl(`/pokemons/${this.pokemon.id}`)
      .catch((error) => console.log({ error }));
  };
}
