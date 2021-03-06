import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    /*redirectTo: 'folder/Inbox',*/
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pagina/home/home.module').then( m => m.HomePageModule)
  },
  
  {
    path: 'botao',
    loadChildren: () => import('./pagina/botao/botao.module').then( m => m.BotaoPageModule)
  },
  {
    path: 'lista',
    loadChildren: () => import('./pagina/lista/lista.module').then( m => m.ListaPageModule)
  },
  {
    path: 'alertas',
    loadChildren: () => import('./pagina/alertas/alertas.module').then( m => m.AlertasPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./pagina/categorias/categorias.module').then( m => m.CategoriasPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pagina/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pagina/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./pagina/produtos/produtos.module').then( m => m.ProdutosPageModule)
  },
  {
    path: 'produto-detail',
    loadChildren: () => import('./pagina/produto-detail/produto-detail.module').then( m => m.ProdutoDetailPageModule)
  },  {
    path: 'cart',
    loadChildren: () => import('./pagina/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'pick-address',
    loadChildren: () => import('./pagina/pick-address/pick-address.module').then( m => m.PickAddressPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./pagina/payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'order-confirmation',
    loadChildren: () => import('./pagina/order-confirmation/order-confirmation.module').then( m => m.OrderConfirmationPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
