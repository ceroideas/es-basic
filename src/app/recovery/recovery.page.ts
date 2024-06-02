import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage implements OnInit {


  email:any;
  code:any;
  reenterCode:any;
  password:any;
  password_confirmation:any;

  step = 1;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toast: ToastController, public api: ApiService) { }

  ngOnInit() {
    this.code = Math.floor(Math.random()*999999)+100000;

    console.log(this.code)
  }

  enviar() {

    if (!this.email) {
      this.alertCtrl.create({message:"Ingrese el email para recuperar la contraseña", buttons: [{
        text: "Aceptar"
      }]}).then(a=>{
        a.present();
      })
    }
    this.loadingCtrl.create().then(a=>{
      a.present();
      this.api.sendCode({email:this.email,code:this.code})
        .subscribe((data:any)=>{
        a.dismiss();
        this.step = 2;
        this.alertCtrl.create({message:"Ingrese el código enviado a su correo electrónico", buttons: [{
          text: "Aceptar"
        }]}).then(a=>{
          a.present();
        })
      },err=>{
        a.dismiss();
        console.log(err);
        var arr = Object.keys(err.error.errors).map(function(k) { return err.error.errors[k] });
        let errorMessage = arr[0][0];
        this.alertCtrl.create({message:errorMessage}).then(al=>{al.present();/*setTimeout(()=>{al.dismiss()},3000)*/});
      })

    })
  }

  comprobar()
  {

    if (this.code != this.reenterCode) {
      this.alertCtrl.create({message:"El código ingresado no coincide con el enviado al correo", buttons: [{
        text: "Aceptar"
      }]}).then(a=>{
        a.present();
      })
    }else{
      this.loadingCtrl.create().then(l=>{
        l.present();

        this.alertCtrl.create({message:"Ingrese la nueva contraseña", buttons: [{
          text: "Aceptar"
        }]}).then(a=>{
          a.present();
        })
        this.step = 3;

        l.dismiss();
      })
    }

  }

  change()
  {
    this.loadingCtrl.create().then(a=>{

      a.present();

      this.api.changePassword({password:this.password,password_confirmation:this.password_confirmation,email:this.email})
        .subscribe((data:any)=>{

        a.dismiss();

        this.navCtrl.navigateRoot('login');
        this.alertCtrl.create({message:"¡Contraseña cambiada con éxito! Puede iniciar sesión ahora",buttons: [{
          text: "Aceptar"
        }]}).then(a=>{
          a.present();
        })

      },err=>{
        a.dismiss();
        console.log(err);
        var arr = Object.keys(err.error.errors).map(function(k) { return err.error.errors[k] });
        let errorMessage = arr[0][0];
        this.alertCtrl.create({message:errorMessage}).then(al=>{al.present();/*setTimeout(()=>{al.dismiss()},3000)*/});
      })

    })
  }

}
