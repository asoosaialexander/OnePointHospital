import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LookupListsComponent } from './components/admin/lookup-lists/lookup-lists.component';
import { AddDialogComponent } from './components/admin/add-dialog/add-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DynamicFormComponent } from './components/admin/dynamic-form/dynamic-form.component';
import { CreateCustomFormComponent } from './components/admin/create-custom-form/create-custom-form.component';
import { ViewCustomFormComponent } from './components/admin/view-custom-form/view-custom-form.component';
import { EditFieldDialogComponent } from './components/admin/edit-field-dialog/edit-field-dialog.component';
import { EditAppointmentComponent } from './components/appointment/edit-appointment/edit-appointment.component';
import { ViewPatientComponent } from './components/patient/view-patient/view-patient.component';
import { AddPatientComponent } from './components/patient/add-patient/add-patient.component';
import { PatientFormDialogComponent } from './components/patient/patient-form-dialog/patient-form-dialog.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './../utils/initializeKeycloak';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { ViewAppointmentComponent } from './components/appointment/view-appointment/view-appointment.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LookupListsComponent,
    AddDialogComponent,
    DynamicFormComponent,
    CreateCustomFormComponent,
    ViewCustomFormComponent,
    EditFieldDialogComponent,
    EditAppointmentComponent,
    ViewPatientComponent,
    AddPatientComponent,
    PatientFormDialogComponent,
    LogoutComponent,
    HomeComponent,
    ViewAppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    KeycloakAngularModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLoggingUrl: environment.apiUrl + "logs/",
      serverLogLevel: NgxLoggerLevel.DEBUG,
    }),
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService],
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
