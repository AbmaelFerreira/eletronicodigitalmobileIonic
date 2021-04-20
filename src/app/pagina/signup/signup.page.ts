import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  form:FormGroup;

   

  constructor(public menu: MenuController, private formBuilder: FormBuilder) {
     
  }

  openFirst() {
    this.menu.enable(false, 'first');
    this.menu.open('first');
  }
   

  ngOnInit() {

    this.form = this.formBuilder.group ({
      nome: new FormControl('', [Validators.minLength(20), Validators.required, Validators.minLength(5)]),
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
      telefone2:new FormControl('',[Validators.required]),
      telefone3:new FormControl('',[Validators.required]),
      estadoId: new FormControl(null,[Validators.required]),
      cidadeId:new FormControl(null,[Validators.required])
  });
  }
}
