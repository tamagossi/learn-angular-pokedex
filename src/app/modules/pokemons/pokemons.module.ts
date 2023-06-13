import { CommonModule } from '@angular/common';
import { CoreModule } from '@/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PokemonsComponent } from './pokemons.component';
import { PokemonsRoutingModule } from './pokemons-routing.module';

@NgModule({
  declarations: [PokemonsComponent],
  imports: [
    CommonModule,
    CoreModule,
    PokemonsRoutingModule,
    HttpClientModule,
    RouterModule,
  ],
})
export class PokemonsModule {}
