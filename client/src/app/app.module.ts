import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './pages/search/search.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValuesComponent } from './pages/values/values.component';
import { UserValueComponent } from './components/user-value/user-value.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';


import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { FormsModule } from '@angular/forms';
import { PhotoComponent } from './components/photo/photo.component';
import { GroupSettingsComponent } from './components/group-settings/group-settings.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { ChoicesComponent } from './components/choices/choices.component';
import {MatChipsModule} from '@angular/material/chips';
import { TeammateComponent } from './components/teammate/teammate.component';
import { TeamComponent } from './components/team/team.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = {
	url: env.socketUrl, // socket server url;
	options: {
		transports: ['websocket']
	}
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    ValuesComponent,
    UserValueComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    ProfileComponent,
    SettingsComponent,
    DashboardComponent,
    PhotoComponent,
    GroupSettingsComponent,
    UserSettingsComponent,
    ChoicesComponent,
    TeammateComponent,
    TeamComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatChipsModule,
    AuthModule.forRoot({
      ...env.auth,
    }),
    SocketIoModule.forRoot(config),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
