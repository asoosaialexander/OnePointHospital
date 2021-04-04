import { NgModule } from '@angular/core';
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
import { AddPatientComponent } from './components/patient/add-patient/add-patient.component';

@NgModule({
  declarations: [
    AppComponent,
    LookupListsComponent,
    AddDialogComponent,
    DynamicFormComponent,
    CreateCustomFormComponent,
    ViewCustomFormComponent,
    EditFieldDialogComponent,
    AddPatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
