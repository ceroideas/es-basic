import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameSheetPage } from './game-sheet.page';

const routes: Routes = [
  {
    path: '',
    component: GameSheetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameSheetPageRoutingModule {}
