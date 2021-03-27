import { API_CONFIG } from './../../../config/api.config';
import { ClienteService } from './../../../services/domain/cliente.service';
import { Component, OnInit } from '@angular/core';
import { ClienteDTO } from 'src/models/cliente.dto';
import { StorageService } from 'src/services/domain/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  //email: string; 
  cliente: ClienteDTO;

  constructor(
      public storage: StorageService,
      public clienteService: ClienteService
      ) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      //this.email = localUser.email;
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response =>{
          this.cliente = response;
          this.getImageIfExists();
        },
        error =>{});
    }
  }
  
  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => {
        this.cliente.imageUrl = `${API_CONFIG.backetBaseUrl}/cp${this.cliente.id}.jpg`;
      },
      error => {
      });
  }
}