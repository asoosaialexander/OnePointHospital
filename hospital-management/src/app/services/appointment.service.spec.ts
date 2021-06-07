
import { of } from 'rxjs';
import { Appointment } from '../shared/appointment';
import { AppointmentService } from './appointment.service';

describe('AppointmentService', () => {

    let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy };
    let service: AppointmentService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
        service = new AppointmentService(httpClientSpy as any);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('calling getAppointments should peform http Get call once', () => {
        const allAppointments: Appointment[] =
            [{
                id: 1,
                patientId: 1,
                doctorId: 1,
                hospitalId: 1,
                appointmentType: 'video',
                appointmentTime: "10AM",
                isCancelled: false,
                cancellationReason: '',
                createdOn: '',
                createdBy: ''
            }];

        httpClientSpy.get.and.returnValue(of(allAppointments));

        service.getAppointments();
        expect(httpClientSpy.get.calls.count()).toBe(1);
    });

    it('should getAppointmentById peform http Get call once', () => {
        const appointment: Appointment =
        {
            id: 1,
            patientId: 1,
            doctorId: 1,
            hospitalId: 1,
            appointmentType: 'video',
            appointmentTime: "10AM",
            isCancelled: false,
            cancellationReason: '',
            createdOn: '',
            createdBy: ''
        };

        httpClientSpy.get.and.returnValue(of(appointment));

        service.getAppointmentById(1);
        expect(httpClientSpy.get.calls.count()).toBe(1);
    });

    it('addAppointment & updateAppointment should perform http post & put call each once', () => {

        const appointment: Appointment =
        {
            id: 1,
            patientId: 1,
            doctorId: 1,
            hospitalId: 1,
            appointmentType: 'video',
            appointmentTime: "10AM",
            isCancelled: false,
            cancellationReason: '',
            createdOn: '',
            createdBy: ''
        };

        service.addAppointment(appointment);
        service.updateAppointment(1, appointment);
        expect(httpClientSpy.post.calls.count()).toBe(1);
        expect(httpClientSpy.put.calls.count()).toBe(1);
    });

    it('deleteAppointment should call http delete call once', () => {

        service.deleteAppointment(1);
        expect(httpClientSpy.delete.calls.count()).toBe(1);

    });

});
