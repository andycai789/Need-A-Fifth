import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { SearchComponent } from './pages/search/search.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent
  },
  { 
    path: 'settings', 
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'questions', 
    component: QuestionsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'search', 
    component: SearchComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: '', 
    component: HomeComponent 
  },
  { 
    path: '**', 
    component: PageNotFoundComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
