import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;

  public appPages = [
    
    {
      title: 'Primeiro Acesso',
      url: '/login',
      icon: 'card'
    },
    {
      
      title: 'Categorias',
      url: '/categorias',
      icon: 'card'
      /*<ion-icon name="layers-outline"></ion-icon>*/
    },
    {
        title: 'Botao',
        url: '/botao',
        icon: 'radio-button-off'
      },
    {
      
        title: 'Lista',
        url: '/lista',
        icon: 'radio-button-off'
      },
      
    {
      
        title: 'Alerta',
        url: '/alertas',
        icon: 'card'
      },
    {
      title: 'Cadastro NÃO EXISTE A PAGINA',
      url: '/folder/Cadastro',
      icon: 'paper-plane'
    }
    ,
    {
      title: 'PESQUISA Não existe ',
      url: '/folder/Pesquisa',
      icon: 'paper-plane'
    }
  ];

  public listagens = ['Familia','Amigos', 'Irmãos'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
