import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ActionSheetController, LoadingController, NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

import { environment } from '../../../environments/environment';

declare var Stripe:any;

const stripe = Stripe(environment.STRIPE_KEY);

@Component({
  selector: 'app-buy',
  templateUrl: './buy.page.html',
  styleUrls: ['./buy.page.scss'],
})
export class BuyPage implements OnInit {

  elements:any;
  accountNumberElement:any;
  cardNumberElement:any;
  cardExpiryElement:any;
  cardCvcElement:any;

  paymentForm = false;

  user = JSON.parse(localStorage.getItem('AFECuser') || "{}");
  amount:any;
  type:any;

  constructor(public navCtrl: NavController, public api: ApiService, public loadingController: LoadingController, public alertCtrl: AlertController, public modal: ModalController) { }

  ngOnInit() {
    console.log(stripe);
  }

  async pagar() {

    let load = await this.loadingController.create();

    load.present();

    stripe.createToken(this.cardNumberElement).then((result:any)=> {
      console.log(result);
      if (result.error) {
        // Muestra los errores en la consola
        load.dismiss();
        alert(result.error.message);
      } else {
        // Envía el token a tu servidor
        // alert(result.token.id);
        this.api.processPayment1({stripe_token:result.token.id,email:this.user.email,id:this.user.id,amount:this.amount,type:this.type}).subscribe(data=>{
          load.dismiss();
          console.log(data);
          this.presentAlert();
          this.modal.dismiss();
        });
        // envia aqui el token, el id del usuario, el monto, y realizar el pago en el backend
      }
    },(err:any)=>{
      load.dismiss();
      console.log(err);
    });
  }

  comprar(type:any) {

    this.paymentForm = true;

    this.type = type;
    if (this.type == 'month') {
      this.amount = 7.00;
    }else{
      this.amount = 70.00;
    }

    setTimeout(()=>{
      this.elements = stripe.elements();

      /*this.accountNumberElement = elements.create('iban',{supportedCountries: ['SEPA']});
      this.accountNumberElement.mount('#account-number-element');*/

      this.cardNumberElement = this.elements.create('cardNumber');
      if (document.getElementById('card-number-element')) {
          this.cardNumberElement.mount('#card-number-element');
      }

      this.cardExpiryElement = this.elements.create('cardExpiry');
      if (document.getElementById('card-expiry-element')) {
          this.cardExpiryElement.mount('#card-expiry-element');
      }

      this.cardCvcElement = this.elements.create('cardCvc');
      if (document.getElementById('card-cvc-element')) {
          this.cardCvcElement.mount('#card-cvc-element');
      }
    },100)

  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Pago realizado',
      message: 'El pago ha sido realizado correctamente, en breve la aplicación quedará activada.',
      buttons: [{
        text: 'Aceptar',
        handler:()=>{

          setTimeout(()=>{

            this.api.checkVPro(this.user.email).subscribe((data:any)=>{
              if (data) {
                this.api.vPro = true;
                
                this.alertCtrl.create({
                  header: 'Versión PRO',
                  message: 'La versión PRO ha sido activada, disfruta de todas las ventajas.',
                  buttons: ['Aceptar']}).then(a=>{a.present()});

              }else{
                // this.api.vPro = true;
                this.api.vPro = false;
              }
            })

          },5000)
        }
      }],
    });

    await alert.present();
  }

}
