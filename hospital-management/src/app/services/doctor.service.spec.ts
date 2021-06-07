
import { of } from 'rxjs';
import { Doctor } from '../shared/doctor';
import { DoctorService } from './doctor.service';

describe('DoctorService', () => {

    let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy };
    let service: DoctorService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
        service = new DoctorService(httpClientSpy as any);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('calling getDoctors should peform http Get call once', () => {
        const doctors: Doctor[] =
            [{
                id: 1,
                firstName:'',
                lastName:'',
                speciality:'',
                gender:'male',
                consultationFee:200,
                medicalId:''
            }];

        httpClientSpy.get.and.returnValue(of(doctors));

        service.getDoctors();
        expect(httpClientSpy.get.calls.count()).toBe(1);
    });

    it('should getDoctorById peform http Get call once', () => {
        const doctor: Doctor =
        {
            id: 1,
            firstName:'',
            lastName:'',
            speciality:'',
            gender:'male',
            consultationFee:200,
            medicalId:''
        };

        httpClientSpy.get.and.returnValue(of(doctor));

        service.getDoctorById(1);
        expect(httpClientSpy.get.calls.count()).toBe(1);
    });

    it('addDoctor & updateDoctor should perform http post & put call each once', () => {

        const doctor: Doctor =
        {
            id: 1,
            firstName:'',
            lastName:'',
            speciality:'',
            gender:'male',
            consultationFee:200,
            medicalId:''
        };

        service.addDoctor(doctor);
        service.updateDoctor(1, doctor);
        expect(httpClientSpy.post.calls.count()).toBe(1);
        expect(httpClientSpy.put.calls.count()).toBe(1);
    });

    it('deleteDoctor should call http delete call once', () => {

        service.deleteDoctor(1);
        expect(httpClientSpy.delete.calls.count()).toBe(1);

    });

});
