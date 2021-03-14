import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.page.html',
  styleUrls: ['./alertas.page.scss'],
})
export class AlertasPage implements OnInit {
  nome="Rodrigo"
  nome2="Lucas"
  
  constructor(public alertController: AlertController) { }
  
  async AbrirAlerta(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Aqui é o Alerta',
      subHeader: 'Quem é você?',
      message: 'Você se chama Maria?.',
      buttons: [
          {
            text: 'Sim',
            role: 'sim',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Sim');
              this.nome = "Mária"
            }
          }, {
            text: 'Não',
            handler: () => {
              console.log('Você clicou no OK');
            }
          }
        ]
      
    });

    await alert.present();
    }



    async AbrirAlerta2(){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Qual é o seu nome?',
        inputs: [
          {
            name: 'nome',
            type: 'text',
            placeholder: 'Digite seu nome'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (dados) => {
              console.log(dados);
            }
          }, {
            text: 'Ok',
            handler: (dados) => {
              //console.log(dados);
              this.nome2 = dados.nome
            }
          }
        ]
      });
  
      await alert.present();
      }

  ngOnInit() {
  }

}
