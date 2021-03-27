import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LookupListsComponent } from './components/admin/lookup-lists/lookup-lists.component';

const routes: Routes = [
   { path: 'lookup-lists', component: LookupListsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
