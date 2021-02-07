import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateFormComponent } from './create-form/create-form.component';
import { ListFormComponent } from './list-form/list-form.component';


const routes: Routes = [
  { path: 'form', component: CreateFormComponent },
  { path: 'list', component: ListFormComponent },
  { path: 'edit-form/:id', component: CreateFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
