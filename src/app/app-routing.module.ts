import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './products/list/list.component';
import { CreateComponent } from './products/create/create.component';
import { DetailComponent } from './products/detail/detail.component';
import { EditComponent } from './products/edit/edit.component';

const routes: Routes = [
  {path: 'list', component: ListComponent},
  {path: 'detalle/:id', component: DetailComponent},
  {path: 'nuevo', component: CreateComponent},
  {path: 'editar/:id', component: EditComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
