import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPlayerPageRoutingModule } from './new-player-routing.module';

import { NewPlayerPage } from './new-player.page';

import { PipesModule } from '../../pipes/pipes.module';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    TranslateModule.forChild(),
    NewPlayerPageRoutingModule
  ],
  declarations: [NewPlayerPage]
})
export class NewPlayerPageModule {}
