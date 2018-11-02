import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/login/login.component';
import { RegisterComponent } from './app/register/register.component';
import { ForgotPasswordComponent } from './app/forgot-password/forgot-password.component';
import { PlayerComponent } from './app/player/player.component';
import { SplashComponent } from './app/splash/splash.component';

const appRoutes: Routes = [
    {
      path: '',
      redirectTo: 'splash',
      pathMatch: 'full'
    },
    {
      path: 'splash',
      component: SplashComponent
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'player',
      component: PlayerComponent
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'register',
      component: RegisterComponent,
    },
    {
      path: 'forgot-password',
      component: ForgotPasswordComponent,
    },
      {path: '**', redirectTo: 'home', pathMatch: 'full'}
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }