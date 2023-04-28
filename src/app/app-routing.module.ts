import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { FloursComponent } from './flours/flours.component';

const TABLE: string = 'table';
const FLOURS: string = 'flours';
const EMPTY: string = '';

let routes: Routes = [
  { path: TABLE, component: TableComponent },
  { path: FLOURS, component: FloursComponent }, 
  { path: EMPTY, redirectTo: TABLE, pathMatch: 'full' },
  { path: '**', redirectTo: TABLE }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
