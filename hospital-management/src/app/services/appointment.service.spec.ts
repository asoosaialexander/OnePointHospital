
import { of } from 'rxjs';
import { Appointment } from '../shared/appointment';
import { AppointmentService } from './appointment.service';

describe('AppointmentService', () => {

    let httpClientSpy: { get: jasmine.Spy };
    let service: AppointmentService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new AppointmentService(httpClientSpy as any);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should getAppointmentById peform http Get call once', () => {
        const appointment: Appointment =
            { 
                id: 1, 
                patientId:1,
                doctorId:1,
                hospitalId:1,
                appointmentType:'video',
                appointmentTime:"10AM",
                isCancelled:false,
                cancellationReason:'',
                createdOn:'',
                createdBy:''
            };

        httpClientSpy.get.and.returnValue(of(appointment));

        service.getAppointmentById(1);
        expect(httpClientSpy.get.calls.count()).toBe(1);
    });

});
