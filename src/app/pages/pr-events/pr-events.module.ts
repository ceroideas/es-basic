import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrEventsPageRoutingModule } from './pr-events-routing.module';

import { PrEventsPage } from './pr-events.page';

import { PipesModule } from '../../pipes/pipes.module';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    TranslateModule.forChild(),
    PrEventsPageRoutingModule
  ],
  declarations: [PrEventsPage]
})
export class PrEventsPageModule {}
