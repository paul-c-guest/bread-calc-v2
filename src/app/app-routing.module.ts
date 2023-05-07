import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { FloursComponent } from './flours/flours.component';
import { StarterComponent } from './starter/starter.component';
import { FLOURS, STARTER, TABLE } from './shared.constants';

let routes: Routes = [
  { path: TABLE, component: TableComponent },
  { path: STARTER, component: StarterComponent },
  { path: FLOURS, component: FloursComponent },
  { path: '', redirectTo: TABLE, pathMatch: 'full' },
  { path: '**', redirectTo: TABLE }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
