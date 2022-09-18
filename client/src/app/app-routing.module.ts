import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { TeammatesComponent } from './pages/teammates/teammates.component';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent,
  },
  { 
    path: 'userSettings', 
    component: SettingsComponent,
    canActivate: [AuthGuard],
    data: { animation: 'settingsPage' },
  },
  { 
    path: 'questions', 
    component: QuestionsComponent,
    canActivate: [AuthGuard],
    data: { animation: 'questionsPage' },
  },
  { 
    path: 'search', 
    component: SearchComponent,
    canActivate: [AuthGuard],
    data: { animation: 'searchPage' },
  },
  { 
    path: 'search/teams', 
    component: TeamsComponent,
    canActivate: [AuthGuard],
  },
  { 
    path: 'search/teammates', 
    component: TeammatesComponent,
    canActivate: [AuthGuard],
  },
  { 
    path: '', 
    component: HomeComponent,
  },
  { 
    path: '**', 
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
