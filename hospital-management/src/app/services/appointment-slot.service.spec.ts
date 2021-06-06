import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppointmentSlot } from '../shared/appointment-slot';
import { AppointmentSlotService } from './appointment-slot.service';

describe('AppointmentSlotService', () => {

    let service: AppointmentSlotService;
    let spy: any;

    beforeEach(() => {
        spy = jasmine.createSpyObj('AppointmentSlotService', [
            'getAppointmentSlots',
            'getAppointmentSlotsByDoctor',
            'addAppointmentSlot',
            'updateAppointmentSlot',
            'deleteAppointmentSlot'
        ]);
        spy.getAppointmentSlots.and.returnValue(of([]));
        spy.getAppointmentSlotsByDoctor.and.returnValue(of([]));
        spy.addAppointmentSlot.and.returnValue(of({}));
        spy.updateAppointmentSlot.and.returnValue(of({}));
        spy.deleteAppointmentSlot.and.returnValue(of({}));

        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ],
            providers: [
                { provide: AppointmentSlotService, useValue: spy }
            ]
        });

        service = TestBed.inject(AppointmentSlotService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call all the CRUD functions', () => {
        service.getAppointmentSlots()
        expect(spy.getAppointmentSlots).toHaveBeenCalled();

        service.getAppointmentSlotsByDoctor(0, '12-12-2020')
        expect(spy.getAppointmentSlotsByDoctor).toHaveBeenCalled();

        const slot: AppointmentSlot = {
            id: 0,
            doctorId: 0,
            hospitalId: 0,
            time: "12PM",
            day: "tuesday",
            type: "video",
            noOfSlots: 2
        }

        service.addAppointmentSlot(slot)
        expect(spy.addAppointmentSlot).toHaveBeenCalled();

        service.updateAppointmentSlot(1, slot)
        expect(spy.updateAppointmentSlot).toHaveBeenCalled();

        service.deleteAppointmentSlot(0)
        expect(spy.deleteAppointmentSlot).toHaveBeenCalled();
    });

});
