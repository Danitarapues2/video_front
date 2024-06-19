import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './products/list/list.component';
import { CreateComponent } from './products/create/create.component';
import { DetailComponent } from './products/detail/detail.component';
import { EditComponent } from './products/edit/edit.component';

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'detalle/:id', component: DetailComponent},
  {path: 'nuevo', component: CreateComponent},
  {path: 'editar/:id', component: EditComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
