import { NgModule } from '@angular/core';
import { RouterModule, Routes ,PreloadAllModules} from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import {DefaultComponent} from './layouts/default/default.component';

const routes: Routes= [
{
  path:'', 
  component: AuthLayoutComponent,
  loadChildren: () => import('./modules/authentication/authentication.module')
                     .then(m => m.AuthenticationModule)
},

{
  path:'', 
  component: DefaultComponent,
  loadChildren: () => import('./modules/settings/settings.module')
                     .then(m => m.SettingsModule)
},
{
  path:'sermons', 
  component: DefaultComponent,
  loadChildren: () => import('./modules/sermon/sermon.module')
                     .then(m => m.SermonModule)
},
{
  path:'departments', 
  component: DefaultComponent,
  loadChildren: () => import('./modules/department/department.module')
                     .then(m => m.DepartmentModule)
},

{
  path:'leaders', 
  component: DefaultComponent,
  loadChildren: () => import('./modules/leader/leader.module')
                     .then(m => m.LeaderModule)
},
{
  path:'events', 
  component: DefaultComponent,
  loadChildren: () => import('./modules/event/event.module')
                     .then(m => m.EventsModule)
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
