import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCustomFormComponent } from './components/admin/create-custom-form/create-custom-form.component';
import { LookupListsComponent } from './components/admin/lookup-lists/lookup-lists.component';
import { ViewCustomFormComponent } from './components/admin/view-custom-form/view-custom-form.component';
import { AppointmentCalendarComponent } from './components/appointment/appointment-calendar/appointment-calendar.component';
import { AddPatientComponent } from './components/patient/add-patient/add-patient.component';
import { ViewPatientComponent } from './components/patient/view-patient/view-patient.component';

const routes: Routes = [
  { path: 'lookup-lists', component: LookupListsComponent },
  { path: 'custom-forms', component: ViewCustomFormComponent },
  { path: 'create-custom-form/:id', component: CreateCustomFormComponent },
  { path: 'view-patient', component: ViewPatientComponent },
  { path: 'add-patient/:id', component: AddPatientComponent },
  { path: 'appointment', component: AppointmentCalendarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
