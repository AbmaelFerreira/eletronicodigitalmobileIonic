import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(public menu: MenuController) {
    
  }

  openFirst() {
    this.menu.enable(false, 'first');
    this.menu.open('first');
  }
  
  
  

  ngOnInit() {
  }
}
