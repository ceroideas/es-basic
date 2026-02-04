import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScoutingPage } from './scouting.page';

const routes: Routes = [
  {
    path: '',
    component: ScoutingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScoutingPageRoutingModule {}
