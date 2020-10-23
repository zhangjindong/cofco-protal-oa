import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  PreloadAllModules,
  NoPreloading,
} from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { NewsComponent } from './page/news/news.component';
import { RegisterComponent } from './page/register/register.component';
import { ProductComponent } from './page/product/product.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'news',
    component: NewsComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'product',
    component: ProductComponent,
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: NoPreloading,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
