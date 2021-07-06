import { ClienteService } from './../../../services/domain/cliente.service';
import { StorageService } from './../../../services/domain/storage.service';
import { EnderecoDTO } from './../../../models/endereco.dto';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items: EnderecoDTO[];

  constructor(
    public storage: StorageService,
    public clienteService: ClienteService,
    public nav: NavController

  ) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos']

        },
          error => {
            if (error.status == 403) {
              this.nav.navigateForward('/home');
            }
          });
    }
    else {
      this.nav.navigateForward('/home');
    }
  }
}
