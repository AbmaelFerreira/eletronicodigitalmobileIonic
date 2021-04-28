import { CidadeDTO } from './../../../models/cidade.dto';
import { EstadoService } from './../../../services/domain/estado.service';
import { CidadeService } from './../../../services/domain/cidade.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { EstadoDTO } from 'src/models/estado.dto';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formGroup:FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[]; 

   

  constructor(
    private formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService) { }

 

  ngOnInit() {

    this.formGroup = this.formBuilder.group ({
      nome: new FormControl('ABMAEL DE LIMA FERREIRA', [Validators.minLength(20), Validators.required, Validators.minLength(5)]),
      email: new FormControl('abmael100@gmail.com',[Validators.required, Validators.email]),
      tipo: new FormControl('1',[Validators.required]),
      cpfOuCnpj: new FormControl('01203855389',[Validators.required, Validators.minLength(11), Validators.maxLength(14)]),
      senha: new FormControl('123',[Validators.required]),
      logradouro: new FormControl('Rua via',[Validators.required]),
      numero:new FormControl('35',[Validators.required]),
      complemento: new FormControl('Apt 3',[]),
      bairro: new FormControl('Copacabana',[]),
      cep: new FormControl('78120460',[Validators.required]),
      telefone1: new FormControl('65992250724',[Validators.required]),
      telefone2:new FormControl(''), // retirar o requerido e commitar
      telefone3:new FormControl(''), // retirar o requerido e commitar
      estadoId: new FormControl(null,[Validators.required]),
      cidadeId:new FormControl(null,[Validators.required])
  });


  this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
           if (this.estados[0].id) {
                this.updateCidades();
            }
      },
    error => { });

  }
/*
  ionViewDidLoad(){
      this.estadoService.findAll()
      .subscribe(
        response => {
          this.estados = response;
          console.log(response);
          console.log(this.estados);
          this.formGroup.controls.estadoId.setValue(this.estados[0].id);
          this.updateCidades();
        },
        error => {});
  } 
  */
  updateCidades() {

    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
    .subscribe(
      response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      },
    
      error => {}
    );
  }
  
}
