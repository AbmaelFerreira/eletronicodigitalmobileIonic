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
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
