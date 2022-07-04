import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './pages/search/search.component';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ValuesComponent } from './pages/values/values.component';
import { UserValueComponent } from './components/user-value/user-value.component';
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { FormsModule } from '@angular/forms';
import { GroupSettingsComponent } from './components/group-settings/group-settings.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { ChoicesComponent } from './components/choices/choices.component';
import { TeammateComponent } from './components/teammate/teammate.component';
import { TeamComponent } from './components/team/team.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';

import { FindTeamComponent } from './pages/find-team/find-team.component';
import { FindTeammateComponent } from './pages/find-teammate/find-teammate.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { TeammatesComponent } from './pages/teammates/teammates.component';
import { CurrentSettingsComponent } from './components/current-settings/current-settings.component';


const config: SocketIoConfig = {
	url: env.socketUrl,
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
    GroupSettingsComponent,
    UserSettingsComponent,
    ChoicesComponent,
    TeammateComponent,
    TeamComponent,
    FindTeamComponent,
    FindTeammateComponent,
    QuestionsComponent,
    TeamsComponent,
    TeammatesComponent,
    CurrentSettingsComponent,
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
    FormsModule,
    MatDialogModule,
    MatTooltipModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
