import { Component, OnInit } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from 'src/services/auth.service';

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
      icon: 'person'
    },
     {
      title: 'Categorias',
      url: '/categorias',
      icon: 'list'
    },
    {
        title: 'Botao',
        url: '/botao',
        icon: 'radio-button-off'
      },
    {
      
        title: 'Listas',
        url: '/lista',
        icon: 'paper-plane'
      },
      
    {
      
        title: 'Alerta',
        url: '/alertas',
        icon: 'card'
      }
  ];

  public labels = [{title: 'sair'}];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public auth: AuthService,
    public nav: NavController


    ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout(labels:{title: string}){

    switch(labels.title){
      case 'sair' :
        this.auth.logout();
        this.nav.navigateForward('/');
        break;
    }
  }


  ngOnInit() {
    const path = window.location.pathname.split('home/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
