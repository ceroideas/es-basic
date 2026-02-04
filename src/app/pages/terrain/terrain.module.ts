import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TerrainPageRoutingModule } from './terrain-routing.module';

import { TerrainPage } from './terrain.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    TerrainPageRoutingModule
  ],
  declarations: [TerrainPage]
})
export class TerrainPageModule {}
