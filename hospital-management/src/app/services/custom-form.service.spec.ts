
import { of } from 'rxjs';
import { CustomForm } from '../shared/custom-form';
import { CustomFormService } from './custom-form.service';

describe('CustomFormService', () => {

    let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy };
    let service: CustomFormService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
        service = new CustomFormService(httpClientSpy as any);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('calling getCustomForm should peform http Get call once', () => {
        const allCustomForms: CustomForm[] =
            [{
                id: '', name: '', type: '', columns: 1, alwaysInclude: true, active: true, fields: []

            }];

        httpClientSpy.get.and.returnValue(of(allCustomForms));

        service.getCustomForm();
        expect(httpClientSpy.get.calls.count()).toBe(1);
    });

    it('should getCustomFormById peform http Get call once', () => {
        service.getCustomFormById('');
        expect(httpClientSpy.get.calls.count()).toBe(1);
    });

    it('addCustomForm & updateCustomForm should perform http post & put call each once', () => {

        const customForm: CustomForm =
        {
            id: '', name: '', type: '', columns: 1, alwaysInclude: true, active: true, fields: []
        };

        service.addCustomForm(customForm);
        service.updateCustomForm('', customForm);
        expect(httpClientSpy.post.calls.count()).toBe(1);
        expect(httpClientSpy.put.calls.count()).toBe(1);
    });

    it('deleteCustomForm should call http delete call once', () => {

        service.deleteCustomForm("1");
        expect(httpClientSpy.delete.calls.count()).toBe(1);

    });

});
