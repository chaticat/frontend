import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: '', component: MainComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
