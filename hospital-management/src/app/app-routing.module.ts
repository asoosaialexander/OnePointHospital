import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCustomFormComponent } from './components/admin/create-custom-form/create-custom-form.component';
import { LookupListsComponent } from './components/admin/lookup-lists/lookup-lists.component';
import { ViewCustomFormComponent } from './components/admin/view-custom-form/view-custom-form.component';
import { AppointmentCalendarComponent } from './components/appointment/appointment-calendar/appointment-calendar.component';
import { AddPatientComponent } from './components/patient/add-patient/add-patient.component';

const routes: Routes = [
  { path: 'lookup-lists', component: LookupListsComponent },
  { path: 'custom-forms', component: ViewCustomFormComponent },
  { path: 'create-custom-form/:id', component: CreateCustomFormComponent },
  { path: 'add-patient', component: AddPatientComponent },
  { path: 'appointment', component: AppointmentCalendarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
