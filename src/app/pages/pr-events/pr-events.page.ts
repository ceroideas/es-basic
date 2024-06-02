import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';

declare var $: any;

@Component({
  selector: 'app-pr-events',
  templateUrl: './pr-events.page.html',
  styleUrls: ['./pr-events.page.scss'],
})
export class PrEventsPage implements OnInit {

  terreno:any;

  step = 1;

  user = JSON.parse(localStorage.getItem('AFECuser'));

  prevents:any = [];
  query1:any;

  proyect = JSON.parse(localStorage.getItem('actualProject'));

  periods:any = [];

  players:any = [];
  other_players:any = [];

  event = "Tiro";
  assistant_id:any;
  period:any;
  minute:any;
  second:any;
  player_id:any;
  team_id:any;
  commited_id:any;
  substitution_id:any;
  foot:any;
  event_type:any;
  notes:any;

  teams = [this.proyect.team1,this.proyect.team2];

  constructor(public api: ApiService, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public modal: ModalController, public events: EventsService) { }

  ngOnInit() {

    for(let i = 0; i < this.proyect.periods; i++)
    {
      this.periods.push(i+1);
    }

    this.getEvents();
  }

  getPlayers()
  {
    console.log('players')
    this.players = [];

    let arr = Array.from(document.querySelectorAll('#drop-element .image-holder-draggable'));

    for (let i of arr) {
      let elem = (i.querySelector('.rotable') as any);
      if (typeof elem.dataset['player'] != 'undefined') {
        if (JSON.parse(elem.dataset['player']).team_id == this.team_id) {
          this.players.push(
            JSON.parse(elem.dataset['player']));
        }else{
          this.other_players.push(
            JSON.parse(elem.dataset['player']));
        }
      }
    }
  }

  getEvents()
  {
    this.api.getEvents(this.proyect.id).subscribe((data:any)=>{
      this.prevents = data;
    })
  }

  upEvent()
  {
    if (this.event == 'Tiro') {
      // this.assistant_id = null;
      this.commited_id = null;
      this.substitution_id = null;
    }

    if (this.event == 'Falta') {
      this.assistant_id = null;
      // this.commited_id = null;
      this.substitution_id = null;
    }

    if (this.event == 'Sustitución') {
      this.assistant_id = null;
      this.commited_id = null;
      // this.substitution_id = null;
    }

    let data = {

      proyect_id: this.proyect.id,
      event: this.event,
      type: this.event_type,
      period: this.period,
      minute: this.minute,
      second: this.second,
      player_id: this.player_id,
      substitution_id: this.substitution_id,
      assistant_id: this.assistant_id,
      commited_id: this.commited_id,
      foot: this.foot,
      note: this.notes,
    };

    console.log(data);
    //
    this.loadingCtrl.create().then(l=>{
      l.present();

      this.api.upEvent(data).subscribe(data=>{
        l.dismiss();

        this.alertCtrl.create({message:"Evento guardado"}).then(a=>a.present());

        this.event = "Tiro";
        this.event_type = null;
        this.period = null;
        this.minute = null;
        this.second = null;
        this.player_id = null;
        this.substitution_id = null;
        this.assistant_id = null;
        this.commited_id = null;
        this.foot = null;
        this.notes = null;

        this.getEvents();
        // localStorage.setItem('actualProject',JSON.stringify(data));
        // this.events.publish('loadProject');
        this.step = 1;
        // this.modal.dismiss();

        this.team_id = null;
        this.players = [];
        this.other_players = [];
      })
    })
  }

  delete(id:any)
  {
    this.alertCtrl.create({message:"¿Desea borrar el elemento seleccionado?", buttons: [
    {
      text:"Si",
      handler:()=>{
        this.api.deleteEvent(id).subscribe(data=>{
          this.getEvents();
        });
      }
    },{
      text:"No"
    }
    ]}).then(a=>a.present());
  }

  pdf()
  {
    this.api.pdfEvents(this.proyect.id).subscribe((data:any)=>{
      this.api.downloadFile(data.url)
    });
  }

}
