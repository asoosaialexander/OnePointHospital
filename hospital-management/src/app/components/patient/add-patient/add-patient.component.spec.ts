// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatCard } from '@angular/material/card';
// import { of } from 'rxjs';
// import { CustomFormService } from 'src/app/services/custom-form.service';
// import { PatientService } from 'src/app/services/patient.service';
// import { Patient } from 'src/app/shared/patient';
// import { ActivatedRoute } from '@angular/router';

// import { AddPatientComponent } from './add-patient.component';
// import { Observable } from 'rxjs';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Location } from '@angular/common';

// describe('AddPatientComponent', () => {
//     let component: AddPatientComponent;
//     let fixture: ComponentFixture<AddPatientComponent>;
//     let patientService: any;
//     let customFormService: any;

//     beforeEach(() => {

//         customFormService = jasmine.createSpyObj(CustomFormService.name, [
//             'getCustomFormById'
//         ]);

//         const getCustomFormById = customFormService.getCustomFormById.and.returnValue(of({}));

//         patientService = jasmine.createSpyObj(PatientService.name, [
//             'addPatient', 'updatePatient', 'getPatientById'
//         ]);

//         const addPatient = patientService.addPatient.and.returnValue(of({}));
//         const updatePatient = patientService.updatePatient.and.returnValue(of({}));
//         const getPatientById = patientService.getPatientById.and.returnValue(of({}));

//         const formBuilder = new FormBuilder();

//         TestBed.configureTestingModule({
//             imports: [
//                 MatDialogModule,
//                 ReactiveFormsModule
//             ],
//             declarations: [AddPatientComponent],
//             providers: [
//                 {
//                     provide: ActivatedRoute,
//                     useValue: {
//                         params: of({ id: 123 }),
//                         snapshot: {
//                             paramMap: {
//                                 get(name: string): number {
//                                     if (name === "id")
//                                         return 123;
//                                     return 0;
//                                 }
//                             }
//                         }
//                     }
//                 },
//                 { provide: PatientService, useValue: patientService },
//                 { provide: CustomFormService, useValue: customFormService },
//                 { provide: FormBuilder, useValue: formBuilder },
//                 {provide:Location,useValue:{}}
//             ]
//         }).compileComponents();


//         fixture = TestBed.createComponent(AddPatientComponent);
//         component = fixture.componentInstance;
//         // component.patientForm = formBuilder.group({
//         //     id:  ['0', Validators.required],
//         //     gender: ['', Validators.required],
//         //     firstName: ['', Validators.required],
//         //     lastName: ['', Validators.required],
//         //     dateOfBirth: ['', Validators.required]
//         //   });
//         fixture.detectChanges();
//     });

//     // it('should initiate the component', () => {


//     //     // let id = component.patientForm.controls['id'];
//     //     // id.setValue(0);

//     //     expect(component).toBeTruthy();
//     // });

//     it("should call deletePatient method", () => {

//         const deletedPatient: Patient = {
//             id: 0,
//             lastName: "doe",
//             firstName: "john",
//             dateOfBirth: "12/12/2018",
//             gender: "male"
//         };

//         //component.onSubmit();
//       //  expect(patientService.addPatient).toHaveBeenCalled();
//         //component.delete(deletedPatient);
//         //expect(patientService.deletePatient).toHaveBeenCalled();
//     });
// });
