import { SettingsComponent } from './settings/settings.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestingComponent } from './testing/testing.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/interceptors/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/interceptors/error.interceptor';
import { HomeComponent } from './home/home.component';
<<<<<<< HEAD
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { TradeComponent } from './trade/trade.component';
import { CreditsComponent } from './credits/credits.component';

@NgModule({
  declarations: [
    AppComponent,
    TestingComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    HomeComponent,
    SettingsComponent,
    TradeComponent,
    CreditsComponent
  ],
  imports: [
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    BrowserModule,
    AppRoutingModule,
=======
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SettingsComponent } from './settings/settings.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
@NgModule({
  declarations: [AppComponent, TestingComponent, LoginComponent, NavbarComponent, RegisterComponent, HomeComponent, SettingsComponent],
  imports: [BrowserModule, AppRoutingModule,
>>>>>>> 1b633050d3cf35a5bb39b812f1a9cb450c2c25be
    RouterModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatSnackBarModule,
<<<<<<< HEAD
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    MatSlideToggleModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
=======
    MatIconModule, MatSlideToggleModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}, { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
>>>>>>> 1b633050d3cf35a5bb39b812f1a9cb450c2c25be
  bootstrap: [AppComponent]
})
export class AppModule { }
