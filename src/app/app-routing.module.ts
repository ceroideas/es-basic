import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recovery',
    loadChildren: () => import('./recovery/recovery.module').then( m => m.RecoveryPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'buy',
    loadChildren: () => import('./pages/buy/buy.module').then( m => m.BuyPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./pages/calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'edit-proyect',
    loadChildren: () => import('./pages/edit-proyect/edit-proyect.module').then( m => m.EditProyectPageModule)
  },
  {
    path: 'information',
    loadChildren: () => import('./pages/information/information.module').then( m => m.InformationPageModule)
  },
  {
    path: 'new-exercise',
    loadChildren: () => import('./pages/new-exercise/new-exercise.module').then( m => m.NewExercisePageModule)
  },
  {
    path: 'new-player',
    loadChildren: () => import('./pages/new-player/new-player.module').then( m => m.NewPlayerPageModule)
  },
  {
    path: 'new-project',
    loadChildren: () => import('./pages/new-project/new-project.module').then( m => m.NewProjectPageModule)
  },
  {
    path: 'new-session',
    loadChildren: () => import('./pages/new-session/new-session.module').then( m => m.NewSessionPageModule)
  },
  {
    path: 'open-exercise',
    loadChildren: () => import('./pages/open-exercise/open-exercise.module').then( m => m.OpenExercisePageModule)
  },
  {
    path: 'open-project',
    loadChildren: () => import('./pages/open-project/open-project.module').then( m => m.OpenProjectPageModule)
  },
  {
    path: 'players',
    loadChildren: () => import('./pages/players/players.module').then( m => m.PlayersPageModule)
  },
  {
    path: 'pr-events',
    loadChildren: () => import('./pages/pr-events/pr-events.module').then( m => m.PrEventsPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./pages/reports/reports.module').then( m => m.ReportsPageModule)
  },
  {
    path: 'teams',
    loadChildren: () => import('./pages/teams/teams.module').then( m => m.TeamsPageModule)
  },
  {
    path: 'terrain',
    loadChildren: () => import('./pages/terrain/terrain.module').then( m => m.TerrainPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
