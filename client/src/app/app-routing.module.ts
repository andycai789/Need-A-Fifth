import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { FindTeammateComponent } from './pages/find-teammate/find-teammate.component';
import { FindTeamComponent } from './pages/find-team/find-team.component';

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
    component: FindTeamComponent,
    canActivate: [AuthGuard],
  },
  { 
    path: 'search/teammates', 
    component: FindTeammateComponent,
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
