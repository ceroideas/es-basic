import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScoutingPageRoutingModule } from './scouting-routing.module';

import { PipesModule } from '../../pipes/pipes.module';

import { ScoutingPage } from './scouting.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    TranslateModule.forChild(),
    ScoutingPageRoutingModule
  ],
  declarations: [ScoutingPage]
})
export class ScoutingPageModule {}
