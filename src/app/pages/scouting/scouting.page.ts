import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-scouting',
  templateUrl: './scouting.page.html',
  styleUrls: ['./scouting.page.scss'],
})
export class ScoutingPage implements OnInit {

  user = JSON.parse(localStorage.getItem('AFECuser'));

  nombre:any;
  fechaNacimiento:any;
  altura:any;
  club:any;
  posicion:any;
  camiseta:any;
  partido:any;
  fechaPartido:any;
  tipoPartido:any;
  horario:any;
  minutosJugados:any;
  tecnicoTactico:any;
  fisicoMental:any;
  puntuaciones:any;

  id:any = null;

  puntos:any[] = ["",1,2,3,4,5];

  data:any = {
    "pases":"",
    "concienciaPosicional":"",
    "contexturaFisica":"",
    "concentracion":"",
    "duelos":"",
    "creatividad":"",
    "velocidad":"",
    "voluntad":"",
    "regate":"",
    "movimientoSinBalon":"",
    "rapidez":"",
    "determinacion":"",
    "controlDelBalon":"",
    "concienciaOfensiva":"",
    "fuerza":"",
    "tomaDeDecisiones":"",
    "centros":"",
    "concienciaDefensiva":"",
    "resistencia":"",
    "comunicacion":"",
    "disparos":"",
    "apoyoACompanero":"",
    "juegoAereo":"",
    "valentia":"",
    "timing":"",
    "juegoBajoPresion":"",
    "reaccion":"",
    "fairPlay":"",
    "intercepcion":"",
    "usoDelEspacio":"",
    "coordinacion":"",
    "liderazgo":"",
    "marcaje":"",
    "consistencia":"",
    "balance":"",
    "confianza":"",
    "ofensivo":"",
    "defensivo":"",
    "duelos_1":"",
    "pases_1":"",
  };

  scouting:any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  scoutings:any;

  query1:any;

  sc:any;

  constructor(public translate: TranslateService, public api: ApiService, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public modal: ModalController, public events: EventsService) { }


  step = 1;

  ngOnInit() {
    this.loadScoutings();
  }

  goCreate()
  {
    this.id = null;

    this.nombre = null;
    this.fechaNacimiento = null;
    this.altura = null;
    this.club = null;
    this.posicion = null;
    this.camiseta = null;
    this.partido = null;
    this.fechaPartido = null;
    this.tipoPartido = null;
    this.horario = null;
    this.minutosJugados = null;
    this.tecnicoTactico = null;
    this.fisicoMental = null;
    this.puntuaciones = null;

    this.scouting = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    this.step = 2;
  }

  resetScouting(idx:any)
  {
    let aux = this.scouting[idx];
    // this.scouting = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    if (aux == 0) {
      this.scouting[idx] = 1;
    } else if(aux == 1) {
      this.scouting[idx] = 2;
    } else {
      this.scouting[idx] = 0;
    }
  }

  loadScoutings()
  {
    this.api.loadScoutings(this.user.id).subscribe(data=>{
      this.scoutings = data;
    })
  }

  edit(actual:any)
  {

    this.nombre = actual.nombre;
    this.fechaNacimiento = actual.fechaNacimiento;
    this.altura = actual.altura;
    this.club = actual.club;
    this.posicion = actual.posicion;
    this.camiseta = actual.camiseta;
    this.partido = actual.partido;
    this.fechaPartido = actual.fechaPartido;
    this.tipoPartido = actual.tipoPartido;
    this.horario = actual.horario;
    this.minutosJugados = actual.minutosJugados;
    this.tecnicoTactico = actual.tecnicoTactico;
    this.fisicoMental = actual.fisicoMental;
    this.puntuaciones = actual.puntuaciones;

    this.scouting = actual.scouting;

    this.id = actual.id;

    this.data = actual.data;

    this.step = 2;
  }

  delete(id:any)
  {
    this.alertCtrl.create({message:this.translate.instant("scouting.scouting_94"), buttons: [
    {
      text:"Si",
      handler:()=>{
        this.api.deleteScouting(id).subscribe(data=>{
          this.sc = null;
          this.loadScoutings();
        });
      }
    },{
      text:"No"
    }
    ]}).then(a=>a.present());
  }

  upScouting()
  {
    console.log("aqui")
    this.alertCtrl.create({message:this.translate.instant("scouting.scouting_95"), buttons: [
        {
          text:"Si",
          handler: ():any=> {

            var data = {
              user_id:this.user.id,
              nombre:this.nombre,
              fechaNacimiento:this.fechaNacimiento,
              altura:this.altura,
              club:this.club,
              posicion:this.posicion,
              camiseta:this.camiseta,
              partido:this.partido,
              fechaPartido:this.fechaPartido,
              tipoPartido:this.tipoPartido,
              horario:this.horario,
              minutosJugados:this.minutosJugados,
              tecnicoTactico:this.tecnicoTactico,
              fisicoMental:this.fisicoMental,
              puntuaciones:this.puntuaciones,
              data:this.data,
              scouting:this.scouting
            }

            console.log(data);
            //
            this.loadingCtrl.create().then(l=>{
              l.present()
              this.api.upScouting(data).subscribe(data=>{
                l.dismiss();
                this.loadScoutings();
                this.step = 1;
              })
            })
          }
        },{
          text:"Cancelar"
        }
      ]
    }).then(a=>a.present());
  }

  updateScouting()
  {
    console.log("aqui")
    this.alertCtrl.create({message:this.translate.instant("scouting.scouting_96"), buttons: [
        {
          text:this.translate.instant("scouting.scouting_97"),
          handler: ():any=> {

            var data = {
              id:this.id,
              user_id:this.user.id,
              nombre:this.nombre,
              fechaNacimiento:this.fechaNacimiento,
              altura:this.altura,
              club:this.club,
              posicion:this.posicion,
              camiseta:this.camiseta,
              partido:this.partido,
              fechaPartido:this.fechaPartido,
              tipoPartido:this.tipoPartido,
              horario:this.horario,
              minutosJugados:this.minutosJugados,
              tecnicoTactico:this.tecnicoTactico,
              fisicoMental:this.fisicoMental,
              puntuaciones:this.puntuaciones,
              data:this.data,
              scouting:this.scouting
            }

            console.log(data);
            //
            this.loadingCtrl.create().then(l=>{
              l.present()
              this.api.updateScouting(data,this.id).subscribe(data=>{
                l.dismiss();
                this.loadScoutings();
                this.step = 1;
              })
            })
          }
        },{
          text:this.translate.instant("scouting.scouting_98")
        }
      ]
    }).then(a=>a.present());
  }

  generatePdf(actual:any)
  {
    this.loadingCtrl.create().then(l=>{
      l.present();
      this.api.downloadScouting(actual.id).subscribe((data:any)=>{
        l.dismiss();
        console.log(data);
        this.api.downloadFile(data.url);
      })
    })
  }

}
