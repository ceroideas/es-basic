import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';

declare var moment:any;

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {

  step = 3;

  teams:any = [];
  players:any = [];
  rosters:any = [];

  user = JSON.parse(localStorage.getItem('AFECuser'));

  //
  team_image:any;
  team_name:any;


  player_image:any;
  player_name:any;
  player_number:any;
  player_position:any;
  player_age:any;
  player_weight:any;
  player_height:any;
  player_titular:any;
  player_notes:any;
  player_sex:any;
  player_bday:any;
  player_position_2:any;
  player_phone:any;
  player_email:any;
  player_side:any;


  selectedTeam:any = null;

  team:any = null;

  selectT1N:any;
  selectT1M:any;
  selectT1B:any;

  selectT2N:any;
  selectT2M:any;
  selectT2B:any;

  query:any;
  query1:any;
  query2:any;

  styles = {
    "team1":{number:'#ffffff',main:'#000000',back:'#9e2956',style:1},
    "team2":{number:'#ffffff',main:'#000000',back:'#9e2956',style:1}
  };
  colors = [ '#000000', '#ffffff', '#9e2956', '#c2281d', '#de722f', '#edbf4c', '#5db37e', '#459cde', '#4250ad', '#802fa3' ];

  name:any;

  players_selected:any = [];

  constructor(public api: ApiService, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public modal: ModalController, public events: EventsService) { }

  ngOnInit() {
    this.getTeams();
  }

  selectToggle(this:any,i:any)
  {
    if (this[i]) {
      this[i] = false;
    }else{
      this[i] = true;
    }
  }

  goCreate():any
  {
    if(!this.api.vPro)
    {
      if (this.teams.length >= 1) {
        return this.api.goPro();
      }
      this.step = 4;
    }else{
      this.step = 4;
    }
  }

  getTeams()
  {
    this.api.getTeams(this.user.id).subscribe((data:any)=>{
      this.teams = data;
    })
  }

  prePlayers()
  {
    this.getPlayers();
  }
  preRosters()
  {
    this.rosters = [];
    this.getRosters(this.team);
  }

  getPlayers()
  {
    this.api.getPlayers(this.team).subscribe((data:any)=>{
      this.players = data;
    })
  }

  getRosters(id:any) // id del equipo
  {
    this.api.getRosters(id).subscribe((data:any)=>{
      this.rosters = data;
      this.players_selected = [];
      for(let i of data)
      {
        if(i.player_id) this.players_selected.push(i.player_id);
      }
      console.log(this.players_selected,data,this.players)
    })
  }

  saveTeam()
  {
    this.loadingCtrl.create().then(a=>{

      a.present();
      this.api.upTeam({user_id:this.user.id,name:this.team_name,image:this.team_image}).subscribe((data:any)=>{
        a.dismiss();
        this.step = 3;
        this.teams = data;
      },err=>{
        a.dismiss();
          console.log(err);
          var arr = Object.keys(err.error.errors).map(function(k) { return err.error.errors[k] });
          let errorMessage = arr[0][0];
          this.alertCtrl.create({message:errorMessage}).then(al=>{al.present();setTimeout(()=>{al.dismiss()},3000)});
      })
    });

  }

  upload(this:any,event:any,where:any)
  {
    let file = event.target.files[0];

    let formData = new FormData();

    formData.append("file", file);

    console.log(formData);

    this.api.uploadImage(formData).subscribe((data:any)=>{
      this[where] = data.url
    });
  }

  // prePlayers()
  // {
  //   this.getPlayers();
  // }
  // preRosters()
  // {
  //   this.rosters = [];
  //   this.getRosters(this.team);
  // }

  selectTeam(this:any)
  {
    this['team'+this.selectedTeam] = this.teams[this.team];
    this.step = 2;
  }

  addRoster(data:any)
  {
    data.team_id = this.team;
    this.api.upRoster(data).subscribe((data:any)=>{
      this.rosters = data;
    })
  }

  savePlayer()
  {
    this.player_age = moment().diff(this.player_bday,'years');

    this.loadingCtrl.create().then(a=>{

      a.present();
      this.api.upPlayer(
        {
          user_id:this.user.id,
          team_id:this.team,

          image:this.player_image,
          name:this.player_name,
          number:this.player_number,
          age:this.player_age,

          sex: this.player_sex,
          bday: this.player_bday,

          weight:this.player_weight,
          height:this.player_height,

          position:this.player_position,
          position_2:this.player_position_2,

          titular:this.player_titular,

          phone: this.player_phone,
          email: this.player_email,
          side: this.player_side,

          notes:this.player_notes

        }).subscribe((data:any)=>{
        a.dismiss();

        this.getRosters(this.team);
        
        this.step = 5;
        this.players = data;
        //**//
        this.player_image = null;
        this.player_name = null;
        this.player_number = null;
        this.player_age = null;
        this.player_weight = null;
        this.player_height = null;
        this.player_titular = null;
        this.player_position = null;
        this.player_notes = null;

        this.player_sex = null;
        this.player_bday = null;
        this.player_position_2 = null;
        this.player_phone = null;
        this.player_email = null;
        this.player_side = null;
        //**//
      },err=>{
        a.dismiss();
          console.log(err);
          var arr = Object.keys(err.error.errors).map(function(k) { return err.error.errors[k] });
          let errorMessage = arr[0][0];
          this.alertCtrl.create({message:errorMessage}).then(al=>{al.present();setTimeout(()=>{al.dismiss()},3000)});
      })
    });
  }

  updateRoster(r:any,e:any,type:any)
  {
    if (type == 'player') {
      let p = this.players.find((x:any)=>x.id == e.srcElement.value);

      let elem = e.srcElement.parentNode.parentNode.parentNode;

      console.log(elem.children);

      elem.children.item(4).children.item(0).children.item(0).value = p.number;

      
      elem.children.item(5).children.item(0).children.item(0).children.item(0).children.item(0).value = p.position;
      elem.children.item(5).children.item(0).children.item(1).children.item(0).children.item(0).value = p.position_2;
      // elem.children.item(3).children.item(0).children.item(0).checked = p.titular == 1;

      this.api.upRosterPlayer({
        id:r.id,
        player_id:p.id,
        number:p.number,
        position:p.position,
        position_2:p.position_2,
        titular:p.titular
      }).subscribe((data:any)=>{
        this.rosters = data;
        this.players_selected = [];
        for(let i of data)
        {
          if(i.player_id) this.players_selected.push(i.player_id);
        }
        console.log(this.players_selected,data,this.players)
      });

    }else{
      let p = this.players.find((x:any)=>x.id == r.player_id);
      p.number = (document.querySelector('.numbers[data-id="'+r.id+'"]') as any).value ;
      p.position = (document.querySelector('.positions[data-id="'+r.id+'"]') as any).value;
      p.position_2 = (document.querySelector('.positions_2[data-id="'+r.id+'"]') as any).value;
      // p.titular = (document.querySelector('.positions[data-id="'+r.id+'"]') as any).checked;

      this.api.upRosterPlayer({
        id:r.id,
        player_id:p.id,
        number:p.number,
        position:p.position,
        position_2:p.position_2,
        titular:p.titular
      }).subscribe((data:any)=>{
        this.rosters = data;
        this.players_selected = [];
        for(let i of data)
        {
          if(i.player_id) this.players_selected.push(i.player_id);
        }
        console.log(this.players_selected,data,this.players)
      });
    }
  }

  update_team_name:any;
  update_team_image:any;

  edit()
  {
    this.update_team_name = this.teams.find((x:any)=>x.id ==this.team).name;
    this.update_team_image = this.teams.find((x:any)=>x.id ==this.team).image;
  }

  updateTeam()
  {
    this.loadingCtrl.create().then(a=>{

      a.present();
      this.api.updateTeam({id:this.team, user_id:this.user.id,name:this.update_team_name,image:this.update_team_image}).subscribe((data:any)=>{
        a.dismiss();
        this.step = 3;
        this.teams = data;
      },err=>{
        a.dismiss();
          console.log(err);
          var arr = Object.keys(err.error.errors).map(function(k) { return err.error.errors[k] });
          let errorMessage = arr[0][0];
          this.alertCtrl.create({message:errorMessage}).then(al=>{al.present();setTimeout(()=>{al.dismiss()},3000)});
      })
    });
  }

  delete(id:any)
  {
    this.alertCtrl.create({message:"¿Desea borrar el elemento seleccionado?", buttons: [
    {
      text:"Si",
      handler:()=>{
        this.api.deleteTeam(id).subscribe(data=>{
          this.getTeams();
        });
      }
    },{
      text:"No"
    }
    ]}).then(a=>a.present());
  }

  delete2(id:any,t:any)
  {
    this.alertCtrl.create({message:"¿Desea borrar el elemento seleccionado?", buttons: [
    {
      text:"Si",
      handler:()=>{
        this.api.deleteRoster(id).subscribe(data=>{
          this.getRosters(t);
        });
      }
    },{
      text:"No"
    }
    ]}).then(a=>a.present());
  }

}
