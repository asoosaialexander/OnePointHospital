import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCard } from '@angular/material/card';
import { of } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/shared/patient';

import { ViewPatientComponent } from './view-patient.component';

describe('ViewPatientComponent', () => {
    let component: ViewPatientComponent;
    let fixture: ComponentFixture<ViewPatientComponent>;
    let patientService: any;

    beforeEach(() => {

        patientService = jasmine.createSpyObj(PatientService.name, [
            'getPatients', 'deletePatient'
        ]);

        const getPatients = patientService.getPatients.and.returnValue(of([]));
        const deletePatient = patientService.deletePatient.and.returnValue(of({}));

        TestBed.configureTestingModule({
            declarations: [ViewPatientComponent, MatCard],
            providers: [{ provide: PatientService, useValue: patientService }]
        }).compileComponents();


        fixture = TestBed.createComponent(ViewPatientComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();


    });

    it('should create ViewPatient component and call getPatients method', () => {
        expect(component).toBeTruthy();
        

        component.getPatients();
        expect(patientService.getPatients).toHaveBeenCalled();
    });

    it("should call deletePatient method", () => {

        const deletedPatient: Patient = {
            id: 0,
            lastName: "doe",
            firstName: "john",
            dateOfBirth: "12/12/2018",
            gender: "male"
        };


        component.delete(deletedPatient);
        expect(patientService.deletePatient).toHaveBeenCalled();
    });
});
