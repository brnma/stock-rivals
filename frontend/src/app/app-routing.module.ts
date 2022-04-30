import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from './_services/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TradeComponent } from './trade/trade.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GroupComponent} from './group/group.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'trade', component: TradeComponent, canActivate:[AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'settings', component: SettingsComponent, canActivate:[AuthGuard] },
  {path: 'group', component: GroupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
