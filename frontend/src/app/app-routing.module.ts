import { AuthGuard } from './_services/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SettingsComponent} from './settings/settings.component';


const routes: Routes = [{path:'', component:HomeComponent, canActivate:[AuthGuard]}, {path: 'login', component: LoginComponent}, {path:'register', component:RegisterComponent}, {path:'settings', component:SettingsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
