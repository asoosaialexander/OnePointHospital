import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CreateCustomFormComponent } from './components/admin/create-custom-form/create-custom-form.component';
import { LookupListsComponent } from './components/admin/lookup-lists/lookup-lists.component';
import { ViewCustomFormComponent } from './components/admin/view-custom-form/view-custom-form.component';
import { AppointmentCalendarComponent } from './components/appointment/appointment-calendar/appointment-calendar.component';
import { EditAppointmentComponent } from './components/appointment/edit-appointment/edit-appointment.component';
import { ViewAppointmentComponent } from './components/appointment/view-appointment/view-appointment.component';
import { AddPatientComponent } from './components/patient/add-patient/add-patient.component';
import { ViewPatientComponent } from './components/patient/view-patient/view-patient.component';
import { HomeComponent } from './home/home.component';
import { Role } from './shared/role';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'lookup-lists', component: LookupListsComponent, canActivate: [AuthGuard], data: {
      roles: [Role.Admin]
    }
  },
  {
    path: 'custom-forms', component: ViewCustomFormComponent, canActivate: [AuthGuard], data: {
      roles: [Role.Admin]
    }
  },
  {
    path: 'create-custom-form/:id', component: CreateCustomFormComponent, canActivate: [AuthGuard], data: {
      roles: [Role.Admin]
    }
  },
  { path: 'view-patient', component: ViewPatientComponent },
  { path: 'add-patient/:id', component: AddPatientComponent },
  {
    path: 'view-appointment/:frequency', component: ViewAppointmentComponent, canActivate: [AuthGuard], data: {
      roles: [Role.Doctor]
    }
  },
  {
    path: 'edit-appointment/:id', component: EditAppointmentComponent, canActivate: [AuthGuard], data: {
      roles: [Role.Doctor]
    }
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
