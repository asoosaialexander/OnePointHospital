import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppointmentDetails } from '../shared/appointment-details';

import { AppointmentDetailsService } from './appointment-details.service';

describe('AppointmentDetailsService', () => {

    let httpClientSpy: { get: jasmine.Spy };
    let service: AppointmentDetailsService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new AppointmentDetailsService(httpClientSpy as any);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return the http Get call twice', () => {
        const expectedAppointments: AppointmentDetails[] =
            [{ 
                id: 1, 
                date: '12-12-2020', 
                patientName: 'abc', 
                doctorName: 'xyz' ,
                appointmentType:'video',
                location:'',
                status:''
            }];

        httpClientSpy.get.and.returnValue(of(expectedAppointments));

        service.getTodayAppointments();
        service.getWeekAppointments();
        expect(httpClientSpy.get.calls.count()).toBe(2);
    });

});
