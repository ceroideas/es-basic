import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProyectPageRoutingModule } from './edit-proyect-routing.module';

import { EditProyectPage } from './edit-proyect.page';

import { PipesModule } from '../../pipes/pipes.module';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    TranslateModule.forChild(),
    EditProyectPageRoutingModule
  ],
  declarations: [EditProyectPage]
})
export class EditProyectPageModule {}
