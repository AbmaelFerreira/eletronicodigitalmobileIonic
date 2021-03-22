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
      title: 'Profile',
      url: '/profile',
      icon: 'card'
    },
     {
      title: 'Categorias',
      url: '/categorias',
      icon: 'card'
    },
    {
        title: 'Botao',
        url: '/botao',
        icon: 'radio-button-off'
      },
    {
      
        title: 'Lista',
        url: '/lista',
        icon: 'paper-plane'
      },
      
    {
      
        title: 'Alerta',
        url: '/alertas',
        icon: 'card'
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
