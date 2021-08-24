import { MenuController, NavController } from '@ionic/angular';
import { API_CONFIG } from './../../../config/api.config';
import { ClienteService } from './../../../services/domain/cliente.service';
import { Component, OnInit } from '@angular/core';
import { ClienteDTO } from 'src/models/cliente.dto';
import { StorageService } from 'src/services/domain/storage.service';

import { Injectable } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  //email: string; 
  cliente: ClienteDTO;
  picture: string;
  cameraOn: boolean = false;


  constructor(
    public storage: StorageService,
    public clienteService: ClienteService,
    public menu: MenuController,
    public nav: NavController,
    public camera: Camera
  ) { }

  ionViewWillEnter() {
    this.menu.enable(true);
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      //this.email = localUser.email;
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response as ClienteDTO;
          this.getImageIfExists();
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

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => {
        this.cliente.imageUrl = `${API_CONFIG.backetBaseUrl}/cp${this.cliente.id}.jpg`;
      },
        error => {
        });
  }


  getCameraPicture() {
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // Do something with the new photo
        this.picture = 'data:image/png;base64,' + imageData;
        this.cameraOn = false;
      },
      (err) => {
        // Handle error
        console.log("Camera issue: " + err);
      }
    );

  }

  sendPicture() {
    this.clienteService.uploadPicture(this.picture)
      .subscribe(response => {

        this.picture = null;
        this.loadData();
      },
        error => {

        });
  }

  cancel() {
    this.picture = null;
  }
}
