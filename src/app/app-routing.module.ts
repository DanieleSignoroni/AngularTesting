import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuardService } from './auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent}, //all'inizio l'utente verra' rendirizzato verso il login component
  {path: 'home', canActivate: [AuthGuardService], component: HomePageComponent} ,
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
