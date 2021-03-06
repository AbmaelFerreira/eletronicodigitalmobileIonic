import { CartService } from './../services/domain/cart.service';
import { ProdutoService } from './../services/domain/produto.service';
import { ProdutosPage } from './pagina/produtos/produtos.page';
import { ClienteService } from './../services/domain/cliente.service';
import { StorageService } from './../services/domain/storage.service';
import { AuthService } from './../services/auth.service';
import { ErrorInterceptor } from './../ineterceptor/error-interceptor';
import { CategoriaService } from './../services/domain/categoria.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptorProvider } from 'src/ineterceptor/auth-interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentPage } from './pagina/payment/payment.page';
import { ImageUtilService } from 'src/services/image-util.service';

@NgModule({
  declarations: [AppComponent, PaymentPage],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CategoriaService,
    StorageService,
    AuthService,
    ClienteService,
    ProdutosPage,
    AuthInterceptorProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    ProdutoService,
    CartService,
    ImageUtilService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
