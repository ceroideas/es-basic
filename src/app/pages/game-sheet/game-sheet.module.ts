import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameSheetPageRoutingModule } from './game-sheet-routing.module';

import { PipesModule } from '../../pipes/pipes.module';

import { GameSheetPage } from './game-sheet.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    TranslateModule.forChild(),
    GameSheetPageRoutingModule
  ],
  declarations: [GameSheetPage]
})
export class GameSheetPageModule {}
