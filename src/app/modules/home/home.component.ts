import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <section
      class="flex lg:flex-row-reverse flex-1 flex-wrap lg:flex-nowrap items-center"
    >
      <div class="flex justify-center">
        <img
          src="assets/images/pikachu-with-ball.png"
          alt="pikachu"
          class="h-[70%] w-[85%]"
        />
      </div>

      <div class="flex flex-col gap-5 w-full lg:w-3/5 lg:pl-20">
        <h1 class="text-center text-4xl md:text-5xl lg:text-6xl lg:text-left">
          <strong>Find</strong> all your favorite <strong>Pokemon</strong>
        </h1>

        <p class="text-center text-lg md:text-xl lg:text-left">
          You can know the type of Pokemon, its strengths, disadvantages and
          abilities
        </p>

        <div class="flex justify-center lg:justify-start">
          <custom-button [onClick]="goToPokemonListPage">
            See pokemons
          </custom-button>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent {
  constructor(private router: Router) {}

  public goToPokemonListPage = (): void => {
    this.router
      .navigateByUrl('/pokemons')
      .catch((error) => console.log({ error }));
  };
}
