import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('src/app/modules/home/home.module').then((c) => c.HomeModule),
  },
  {
    path: 'pokemons',
    loadChildren: () =>
      import('src/app/modules/pokemons/pokemons.module').then(
        (c) => c.PokemonsModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
