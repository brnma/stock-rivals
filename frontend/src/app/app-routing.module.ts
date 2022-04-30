import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from './_services/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TradeComponent } from './trade/trade.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SettingsComponent} from './settings/settings.component';

<<<<<<< HEAD
const routes: Routes = [
  { path: '', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'trade', component: TradeComponent, canActivate:[AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'settings', component: SettingsComponent, canActivate:[AuthGuard] }
];
=======

const routes: Routes = [{path:'', component:HomeComponent, canActivate:[AuthGuard]}, {path: 'login', component: LoginComponent}, {path:'register', component:RegisterComponent}, {path:'settings', component:SettingsComponent}];
>>>>>>> 1b633050d3cf35a5bb39b812f1a9cb450c2c25be

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
