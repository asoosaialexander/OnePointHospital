import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LookupListsComponent } from './components/admin/lookup-lists/lookup-lists.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';

const routes: Routes = [
   { path: 'lookup-lists', component: LookupListsComponent },
   { path: 'dynamic-display', component: DynamicFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
