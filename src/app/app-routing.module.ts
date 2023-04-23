import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';

const TABLE: string = 'table';
const CONFIG: string = 'config';
const EMPTY: string = '';

let routes: Routes = [
  { path: TABLE, component: TableComponent },
  { path: CONFIG, component: TableComponent },
  { path: EMPTY, redirectTo: TABLE, pathMatch: 'full' },
  { path: '**', redirectTo: TABLE }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
