import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-game-sheet',
  templateUrl: './game-sheet.page.html',
  styleUrls: ['./game-sheet.page.scss'],
})
export class GameSheetPage implements OnInit {

  @ViewChild('cnv1', { static: false }) cnv1: any;
  @ViewChild('cnv2', { static: false }) cnv2: any;
  @ViewChild('cnv3', { static: false }) cnv3: any;
  @ViewChild('cnv4', { static: false }) cnv4: any;
  @ViewChild('cnv5', { static: false }) cnv5: any;
  @ViewChild('cnv6', { static: false }) cnv6: any;

  user = JSON.parse(localStorage.getItem('AFECuser'));

  constructor(public translate: TranslateService, public api: ApiService, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public modal: ModalController, public events: EventsService) { }

  step = 1;
  id:any;
  query1:any;

  jornada:any;
  categoria:any;
  grupo:any;
  local:any;
  local_posicion:any;
  local_resultado:any;
  visit:any;
  visit_posicion:any;
  visit_resultado:any;
  
  cancha:any[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  
  jugadores_1:any[] = new Array(51).fill("");
  jugadores_2:any[] = new Array(51).fill("");
  cambios_1:any;
  cambios_2:any;
  
  cancha_1:any[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  cancha_1_off:any[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  cancha_1_def:any[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  
  observaciones_1:any;
  
  cancha_2:any[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  cancha_2_off:any[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  cancha_2_def:any[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  
  observaciones_2:any;
  
  motivo_1:any;
  repercucion_1:any;
  cancha_cambio_1:any[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  
  motivo_2:any;
  repercucion_2:any;
  cancha_cambio_2:any[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  
  motivo_3:any;
  repercucion_3:any;
  cancha_cambio_3:any[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  
  estrategia_1:any;
  estrategia_2:any;
  estrategia_3:any;
  estrategia_4:any;
  estrategia_5:any;
  estrategia_6:any;

  games:any;

  gm:any;

  /**/

  canvasElement: any;
  auxCanvasElement:any;
  ctx:any;
  auxCtx:any;
  drawing = false;
  lineWidth = 5;

  /**/

  ngOnInit() {
    this.loadGameSheets();
  }

  loadGameSheets()
  {
    this.api.loadGames(this.user.id).subscribe(data=>{
      this.games = data;
    })
  }

  goCreate()
  {
    this.id = null;

    this.jornada = null;
    this.categoria = null;
    this.grupo = null;
    this.local = null;
    this.local_posicion = null;
    this.local_resultado = null;
    this.visit = null;
    this.visit_posicion = null;
    this.visit_resultado = null;
    this.cancha = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.jugadores_1 = new Array(51).fill("");
    this.jugadores_2 = new Array(51).fill("");
    this.cambios_1 = null;
    this.cambios_2 = null;
    this.cancha_1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.cancha_1_off = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.cancha_1_def = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.observaciones_1 = null;
    this.cancha_2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.cancha_2_off = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.cancha_2_def = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.observaciones_2 = null;
    this.motivo_1 = null;
    this.repercucion_1 = null;
    this.cancha_cambio_1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.motivo_2 = null;
    this.repercucion_2 = null;
    this.cancha_cambio_2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.motivo_3 = null;
    this.repercucion_3 = null;
    this.cancha_cambio_3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.estrategia_1 = null;
    this.estrategia_2 = null;
    this.estrategia_3 = null;
    this.estrategia_4 = null;
    this.estrategia_5 = null;
    this.estrategia_6 = null;


    this.step = 2;
  }

  upGame()
  {
    const b64toBlob = (b64Data='', contentType='', sliceSize=512) => {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }

    console.log("aqui")
    this.alertCtrl.create({message:this.translate.instant("game.game_39"), buttons: [
        {
          text:this.translate.instant("game.game_40"),
          handler: ():any=> {

            let formData = new FormData();

            let ids = ['cnv1','cnv2','cnv3','cnv4','cnv5','cnv6'];

            let canvasElement_1 = this.cnv1.nativeElement;
            let canvasElement_2 = this.cnv2.nativeElement;
            let canvasElement_3 = this.cnv3.nativeElement;
            let canvasElement_4 = this.cnv4.nativeElement;
            let canvasElement_5 = this.cnv5.nativeElement;
            let canvasElement_6 = this.cnv6.nativeElement;

            let contentType = "image/png";
            let base64_1 = canvasElement_1.toDataURL("image/png");
            let b64Data_1 = base64_1.split(",")[1];

            let base64_2 = canvasElement_2.toDataURL("image/png");
            let b64Data_2 = base64_2.split(",")[1];

            let base64_3 = canvasElement_3.toDataURL("image/png");
            let b64Data_3 = base64_3.split(",")[1];

            let base64_4 = canvasElement_4.toDataURL("image/png");
            let b64Data_4 = base64_4.split(",")[1];

            let base64_5 = canvasElement_5.toDataURL("image/png");
            let b64Data_5 = base64_5.split(",")[1];

            let base64_6 = canvasElement_6.toDataURL("image/png");
            let b64Data_6 = base64_6.split(",")[1];

            var blob_1 = b64toBlob(b64Data_1, contentType);
            var blob_2 = b64toBlob(b64Data_2, contentType);
            var blob_3 = b64toBlob(b64Data_3, contentType);
            var blob_4 = b64toBlob(b64Data_4, contentType);
            var blob_5 = b64toBlob(b64Data_5, contentType);
            var blob_6 = b64toBlob(b64Data_6, contentType);
            
            formData.append("file_1", blob_1);
            formData.append("file_2", blob_2);
            formData.append("file_3", blob_3);
            formData.append("file_4", blob_4);
            formData.append("file_5", blob_5);
            formData.append("file_6", blob_6);


            formData.append('user_id',this.user.id ?? '');
            formData.append('jornada',this.jornada ?? '');
            formData.append('categoria',this.categoria ?? '');
            formData.append('grupo',this.grupo ?? '');
            formData.append('local',this.local ?? '');
            formData.append('local_posicion',this.local_posicion ?? '');
            formData.append('local_resultado',this.local_resultado ?? '');
            formData.append('visit',this.visit ?? '');
            formData.append('visit_posicion',this.visit_posicion ?? '');
            formData.append('visit_resultado',this.visit_resultado ?? '');
            for(let i = 0; i<this.cancha.length;i++){
              formData.append('cancha[]',this.cancha[i] ?? 0);
            }
            for(let i = 0; i<this.jugadores_1.length;i++){
              formData.append('jugadores_1[]',this.jugadores_1[i] ?? "");
            }
            for(let i = 0; i<this.jugadores_2.length;i++){
              formData.append('jugadores_2[]',this.jugadores_2[i] ?? "");
            }
            formData.append('cambios_1',this.cambios_1 ?? '');
            formData.append('cambios_2',this.cambios_2 ?? '');
            for(let i = 0; i<this.cancha_1.length;i++){
              formData.append('cancha_1[]',this.cancha_1[i] ?? 0);
            }
            for(let i = 0; i<this.cancha_1_off.length;i++){
              formData.append('cancha_1_off[]',this.cancha_1_off[i] ?? 0);
            }
            for(let i = 0; i<this.cancha_1_def.length;i++){
              formData.append('cancha_1_def[]',this.cancha_1_def[i] ?? 0);
            }
            formData.append('observaciones_1',this.observaciones_1 ?? '');
            for(let i = 0; i<this.cancha_2.length;i++){
              formData.append('cancha_2[]',this.cancha_2[i] ?? 0);
            }
            for(let i = 0; i<this.cancha_2_off.length;i++){
              formData.append('cancha_2_off[]',this.cancha_2_off[i] ?? 0);
            }
            for(let i = 0; i<this.cancha_2_def.length;i++){
              formData.append('cancha_2_def[]',this.cancha_2_def[i] ?? 0);
            }
            formData.append('observaciones_2',this.observaciones_2 ?? '');
            formData.append('motivo_1',this.motivo_1);
            formData.append('repercucion_1',this.repercucion_1);
            for(let i = 0; i<this.cancha_cambio_1.length;i++){
              formData.append('cancha_cambio_1[]',this.cancha_cambio_1[i] ?? 0);
            }
            formData.append('motivo_2',this.motivo_2);
            formData.append('repercucion_2',this.repercucion_2);
            for(let i = 0; i<this.cancha_cambio_2.length;i++){
              formData.append('cancha_cambio_2[]',this.cancha_cambio_2[i] ?? 0);
            }
            formData.append('motivo_3',this.motivo_3);
            formData.append('repercucion_3',this.repercucion_3);
            for(let i = 0; i<this.cancha_cambio_3.length;i++){
              formData.append('cancha_cambio_3[]',this.cancha_cambio_3[i] ?? 0);
            }
            formData.append('estrategia_1',this.estrategia_1 ?? '');
            formData.append('estrategia_2',this.estrategia_2 ?? '');
            formData.append('estrategia_3',this.estrategia_3 ?? '');
            formData.append('estrategia_4',this.estrategia_4 ?? '');
            formData.append('estrategia_5',this.estrategia_5 ?? '');
            formData.append('estrategia_6',this.estrategia_6 ?? '');

            console.log(formData);
            //
            this.loadingCtrl.create().then(l=>{
              l.present()
              this.api.upGame(formData).subscribe(data=>{
                l.dismiss();
                this.loadGameSheets();
                this.step = 1;
              })
            })
          }
        },{
          text:this.translate.instant("game.game_41")
        }
      ]
    }).then(a=>a.present());
  }
  updateGame()
  {
    const b64toBlob = (b64Data='', contentType='', sliceSize=512) => {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }

    console.log("aqui")
    this.alertCtrl.create({message:this.translate.instant("game.game_42"), buttons: [
        {
          text:this.translate.instant("game.game_40"),
          handler: ():any=> {

            let formData = new FormData();

            let ids = ['cnv1','cnv2','cnv3','cnv4','cnv5','cnv6'];

            let canvasElement_1 = this.cnv1.nativeElement;
            let canvasElement_2 = this.cnv2.nativeElement;
            let canvasElement_3 = this.cnv3.nativeElement;
            let canvasElement_4 = this.cnv4.nativeElement;
            let canvasElement_5 = this.cnv5.nativeElement;
            let canvasElement_6 = this.cnv6.nativeElement;

            let contentType = "image/png";
            let base64_1 = canvasElement_1.toDataURL("image/png");
            let b64Data_1 = base64_1.split(",")[1];

            let base64_2 = canvasElement_2.toDataURL("image/png");
            let b64Data_2 = base64_2.split(",")[1];

            let base64_3 = canvasElement_3.toDataURL("image/png");
            let b64Data_3 = base64_3.split(",")[1];

            let base64_4 = canvasElement_4.toDataURL("image/png");
            let b64Data_4 = base64_4.split(",")[1];

            let base64_5 = canvasElement_5.toDataURL("image/png");
            let b64Data_5 = base64_5.split(",")[1];

            let base64_6 = canvasElement_6.toDataURL("image/png");
            let b64Data_6 = base64_6.split(",")[1];

            var blob_1 = b64toBlob(b64Data_1, contentType);
            var blob_2 = b64toBlob(b64Data_2, contentType);
            var blob_3 = b64toBlob(b64Data_3, contentType);
            var blob_4 = b64toBlob(b64Data_4, contentType);
            var blob_5 = b64toBlob(b64Data_5, contentType);
            var blob_6 = b64toBlob(b64Data_6, contentType);
            
            formData.append("file_1", blob_1);
            formData.append("file_2", blob_2);
            formData.append("file_3", blob_3);
            formData.append("file_4", blob_4);
            formData.append("file_5", blob_5);
            formData.append("file_6", blob_6);


            formData.append('id',this.id);
            formData.append('user_id',this.user.id ?? '');
            formData.append('jornada',this.jornada ?? '');
            formData.append('categoria',this.categoria ?? '');
            formData.append('grupo',this.grupo ?? '');
            formData.append('local',this.local ?? '');
            formData.append('local_posicion',this.local_posicion ?? '');
            formData.append('local_resultado',this.local_resultado ?? '');
            formData.append('visit',this.visit ?? '');
            formData.append('visit_posicion',this.visit_posicion ?? '');
            formData.append('visit_resultado',this.visit_resultado ?? '');
            for(let i = 0; i<this.cancha.length;i++){
              formData.append('cancha[]',this.cancha[i] ?? 0);
            }
            for(let i = 0; i<this.jugadores_1.length;i++){
              formData.append('jugadores_1[]',this.jugadores_1[i] ?? 0);
            }
            for(let i = 0; i<this.jugadores_2.length;i++){
              formData.append('jugadores_2[]',this.jugadores_2[i] ?? 0);
            }
            formData.append('cambios_1',this.cambios_1 ?? '');
            formData.append('cambios_2',this.cambios_2 ?? '');
            for(let i = 0; i<this.cancha_1.length;i++){
              formData.append('cancha_1[]',this.cancha_1[i] ?? 0);
            }
            for(let i = 0; i<this.cancha_1_off.length;i++){
              formData.append('cancha_1_off[]',this.cancha_1_off[i] ?? 0);
            }
            for(let i = 0; i<this.cancha_1_def.length;i++){
              formData.append('cancha_1_def[]',this.cancha_1_def[i] ?? 0);
            }
            formData.append('observaciones_1',this.observaciones_1 ?? '');
            for(let i = 0; i<this.cancha_2.length;i++){
              formData.append('cancha_2[]',this.cancha_2[i] ?? 0);
            }
            for(let i = 0; i<this.cancha_2_off.length;i++){
              formData.append('cancha_2_off[]',this.cancha_2_off[i] ?? 0);
            }
            for(let i = 0; i<this.cancha_2_def.length;i++){
              formData.append('cancha_2_def[]',this.cancha_2_def[i] ?? 0);
            }
            formData.append('observaciones_2',this.observaciones_2 ?? '');
            formData.append('motivo_1',this.motivo_1);
            formData.append('repercucion_1',this.repercucion_1);
            for(let i = 0; i<this.cancha_cambio_1.length;i++){
              formData.append('cancha_cambio_1[]',this.cancha_cambio_1[i] ?? 0);
            }
            formData.append('motivo_2',this.motivo_2);
            formData.append('repercucion_2',this.repercucion_2);
            for(let i = 0; i<this.cancha_cambio_2.length;i++){
              formData.append('cancha_cambio_2[]',this.cancha_cambio_2[i] ?? 0);
            }
            formData.append('motivo_3',this.motivo_3);
            formData.append('repercucion_3',this.repercucion_3);
            for(let i = 0; i<this.cancha_cambio_3.length;i++){
              formData.append('cancha_cambio_3[]',this.cancha_cambio_3[i] ?? 0);
            }
            formData.append('estrategia_1',this.estrategia_1 ?? '');
            formData.append('estrategia_2',this.estrategia_2 ?? '');
            formData.append('estrategia_3',this.estrategia_3 ?? '');
            formData.append('estrategia_4',this.estrategia_4 ?? '');
            formData.append('estrategia_5',this.estrategia_5 ?? '');
            formData.append('estrategia_6',this.estrategia_6 ?? '');

            console.log(formData);
            //
            this.loadingCtrl.create().then(l=>{
              l.present()
              this.api.updateGame(formData,this.id).subscribe(data=>{
                l.dismiss();
                this.loadGameSheets();
                this.step = 1;
              })
            })
          }
        },{
          text:this.translate.instant("game.game_41")
        }
      ]
    }).then(a=>a.present());
  }

  delete(id:any)
  {
    this.alertCtrl.create({message:this.translate.instant("game.game_43"), buttons: [
    {
      text:this.translate.instant("game.game_40"),
      handler:()=>{
        this.api.deleteGame(id).subscribe(data=>{
          this.gm = null;
          this.loadGameSheets();
        });
      }
    },{
      text:this.translate.instant("game.game_44")
    }
    ]}).then(a=>a.present());
  }

  edit(actual:any)
  {
    this.jornada = actual.jornada;
    this.categoria = actual.categoria;
    this.grupo = actual.grupo;
    this.local = actual.local;
    this.local_posicion = actual.local_posicion;
    this.local_resultado = actual.local_resultado;
    this.visit = actual.visit;
    this.visit_posicion = actual.visit_posicion;
    this.visit_resultado = actual.visit_resultado;
    this.cancha = actual.cancha;
    this.jugadores_1 = actual.jugadores_1;
    this.jugadores_2 = actual.jugadores_2;
    this.cambios_1 = actual.cambios_1;
    this.cambios_2 = actual.cambios_2;
    this.cancha_1 = actual.cancha_1;
    this.cancha_1_off = actual.cancha_1_off;
    this.cancha_1_def = actual.cancha_1_def;
    this.observaciones_1 = actual.observaciones_1;
    this.cancha_2 = actual.cancha_2;
    this.cancha_2_off = actual.cancha_2_off;
    this.cancha_2_def = actual.cancha_2_def;
    this.observaciones_2 = actual.observaciones_2;
    this.motivo_1 = actual.motivo_1;
    this.repercucion_1 = actual.repercucion_1;
    this.cancha_cambio_1 = actual.cancha_cambio_1;
    this.motivo_2 = actual.motivo_2;
    this.repercucion_2 = actual.repercucion_2;
    this.cancha_cambio_2 = actual.cancha_cambio_2;
    this.motivo_3 = actual.motivo_3;
    this.repercucion_3 = actual.repercucion_3;
    this.cancha_cambio_3 = actual.cancha_cambio_3;
    this.estrategia_1 = actual.estrategia_1;
    this.estrategia_2 = actual.estrategia_2;
    this.estrategia_3 = actual.estrategia_3;
    this.estrategia_4 = actual.estrategia_4;
    this.estrategia_5 = actual.estrategia_5;
    this.estrategia_6 = actual.estrategia_6;

    var img_1 = new Image();
    var img_2 = new Image();
    var img_3 = new Image();
    var img_4 = new Image();
    var img_5 = new Image();
    var img_6 = new Image();

    setTimeout(()=>{
      let canvasElement_1 = this.cnv1.nativeElement;
      let ctx_1 = canvasElement_1.getContext('2d');
      img_1.onload = ()=> {
          ctx_1.drawImage(img_1, 0, 0, 300, 237);
      };
      img_1.src = actual.estrategia_imagen_1;

      let canvasElement_2 = this.cnv2.nativeElement;
      let ctx_2 = canvasElement_2.getContext('2d');
      img_2.onload = ()=> {
          ctx_2.drawImage(img_2, 0, 0, 300, 237);
      };
      img_2.src = actual.estrategia_imagen_2;

      let canvasElement_3 = this.cnv3.nativeElement;
      let ctx_3 = canvasElement_3.getContext('2d');
      img_3.onload = ()=> {
          ctx_3.drawImage(img_3, 0, 0, 300, 237);
      };
      img_3.src = actual.estrategia_imagen_3;

      let canvasElement_4 = this.cnv4.nativeElement;
      let ctx_4 = canvasElement_4.getContext('2d');
      img_4.onload = ()=> {
          ctx_4.drawImage(img_4, 0, 0, 300, 237);
      };
      img_4.src = actual.estrategia_imagen_4;

      let canvasElement_5 = this.cnv5.nativeElement;
      let ctx_5 = canvasElement_5.getContext('2d');
      img_5.onload = ()=> {
          ctx_5.drawImage(img_5, 0, 0, 300, 237);
      };
      img_5.src = actual.estrategia_imagen_5;

      let canvasElement_6 = this.cnv6.nativeElement;
      let ctx_6 = canvasElement_6.getContext('2d');
      img_6.onload = ()=> {
          ctx_6.drawImage(img_6, 0, 0, 300, 237);
      };
      img_6.src = actual.estrategia_imagen_6;
    },1000);

    this.id = actual.id;

    this.step = 2;
  }

  generatePdf(actual:any)
  {
    this.loadingCtrl.create().then(l=>{
      l.present();
      this.api.downloadGame(actual.id).subscribe((data:any)=>{
        l.dismiss();
        console.log(data);
        this.api.downloadFile(data.url);
      })
    })
  }

  resetDot(idx: number, variable: keyof this): void {
    // Accede dinámicamente a la propiedad
    const propiedad = this[variable];
    // Valida que sea un arreglo antes de continuar
    if (Array.isArray(propiedad)) {
      // Reinicia todos los valores del arreglo
      for (let i = 0; i < propiedad.length; i++) {
        // propiedad[i] = 0;
      }

      // Modifica el valor en la posición `idx`
      if (propiedad[idx] == 0) {
        propiedad[idx] = 1;
      } else if (propiedad[idx] == 1) {
        propiedad[idx] = 2;
      } else {
        propiedad[idx] = 0;
      }
    } else {
      throw new Error(`La propiedad ${String(variable)} no es un arreglo.`);
    }
  }

  /*************************/

  getCurrent(ev:any)
  {
    let currentX;
    let currentY;

    var canvasPosition = this.canvasElement.getBoundingClientRect();

    if(ev.type == 'touchstart' || ev.type == 'touchmove' || ev.type == 'touchend' || ev.type == 'touchcancel'){
      var evt = (typeof ev.originalEvent === 'undefined') ? ev : ev.originalEvent;
      var touch = evt.touches[0] || evt.changedTouches[0];
      currentX = touch.pageX - canvasPosition.x;
      currentY = touch.pageY - canvasPosition.y;
    } else if (ev.type == 'mousedown' || ev.type == 'mouseup' || ev.type == 'mousemove' || ev.type == 'mouseover'|| ev.type=='mouseout' || ev.type=='mouseenter' || ev.type=='mouseleave') {
      currentX = ev.pageX - canvasPosition.x;
      currentY = ev.pageY - canvasPosition.y;
    }

    return [currentX,currentY];
  }

  saveX:any;
  saveY:any;

  clearCanvas(id: keyof this)
  {
    this.canvasElement = this[id];
    this.canvasElement = this.canvasElement.nativeElement;
    this.ctx = this.canvasElement.getContext('2d');
    this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }

  startDrawing(event:any,id: keyof this)
  {
    this.drawing = true;
    this.canvasElement = this[id];

    this.canvasElement = this.canvasElement.nativeElement;

    this.saveX = this.getCurrent(event)[0];
    this.saveY = this.getCurrent(event)[1];
    console.log('start drawing')
  }

  moved(ev:any,id: keyof this): void {

    if (!this.drawing) return;

    let currentX:any = this.getCurrent(ev)[0];
    let currentY:any = this.getCurrent(ev)[1];

    this.ctx = this.canvasElement.getContext('2d');

    this.ctx.lineJoin = 'round';
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = 'black';

    this.ctx.beginPath();
    this.ctx.moveTo(this.saveX, this.saveY);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.closePath();
    this.ctx.stroke();
   
    this.saveX = currentX;
    this.saveY = currentY;
  }

  endDrawing(event:any,id: keyof this)
  {
    this.drawing = false;
    console.log('end drawing')
  }

}
