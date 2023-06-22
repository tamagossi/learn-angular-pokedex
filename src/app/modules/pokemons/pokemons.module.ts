import { CommonModule } from '@angular/common';
import { CoreModule } from '@/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PokemonsRoutingModule } from './pokemons-routing.module';
import { TypeBadgeComponent } from './components/type-badge/type-badge.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonsComponent } from './pages/pokemons/pokemons.component';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';

@NgModule({
  declarations: [PokemonsComponent, TypeBadgeComponent, PokemonCardComponent, PokemonDetailComponent],
  imports: [
    CommonModule,
    CoreModule,
    HttpClientModule,
    PokemonsRoutingModule,
    RouterModule,
  ],
})
export class PokemonsModule {}
