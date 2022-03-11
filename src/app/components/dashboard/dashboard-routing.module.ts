import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { AddEditComponent } from './users/add-edit/add-edit.component';
import { UsersComponent } from './users/users.component';
import { ViewComponent } from './users/view/view.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'usuarios', component: UsersComponent },
    { path: 'usuarios/crear', component: AddEditComponent },
    { path: 'usuarios/actualizar/:idUser', component: AddEditComponent },
    { path: 'usuarios/:idUser', component: ViewComponent },

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
