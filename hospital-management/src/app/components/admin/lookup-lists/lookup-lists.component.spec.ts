import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { LookupService } from 'src/app/services/lookup.service';
import { Lookup } from 'src/app/shared/lookup';
import { LookupListsComponent } from './lookup-lists.component';

describe('LookupListsComponent', () => {
    let component: LookupListsComponent;
    let fixture: ComponentFixture<LookupListsComponent>;
    let lookupService: any;
    let matSnakBarSpy: { open: jasmine.Spy };

    beforeEach(() => {

        lookupService = jasmine.createSpyObj(LookupService.name, [
            'getLookupTypes', 'getLookupById', 'addLookupEntry', 'deleteEntry'
        ]);

        matSnakBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

        const getLookupTypes = lookupService.getLookupTypes.and.returnValue(of([]));
        const getLookupById = lookupService.getLookupById.and.returnValue(of({}));
        const addLookupEntry = lookupService.addLookupEntry.and.returnValue(of({}));
        const deleteEntry = lookupService.deleteEntry.and.returnValue(of({}));
        deleteEntry


        TestBed.configureTestingModule({
            imports: [
                MatDialogModule,
                BrowserAnimationsModule
            ],
            declarations: [LookupListsComponent],
            providers: [
                { provide: LookupService, useValue: lookupService },
                { provide: MatSnackBar, useValue: matSnakBarSpy }
            ]
        }).compileComponents();


        fixture = TestBed.createComponent(LookupListsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create LookupListsComponent', () => {
        expect(component).toBeTruthy();
    });

    it('should call getLookupTypes', () => {
        component.getLookupTypes();
        expect(lookupService.getLookupTypes).toHaveBeenCalled();
    });

    it('should call getLookupData', () => {
        component.getLookupData(1);
        expect(lookupService.getLookupById).toHaveBeenCalled();
    });

    it('should call getLookupData after onLookupTypeChange', () => {
        component.onLookupTypeChange(1);
        expect(lookupService.getLookupTypes).toHaveBeenCalled();
    });

    it('deleteEntry should call addLookupEntry', () => {

        const deleteLookup: Lookup = {
            id: 0,
            value: "value",
            typeId: 0
        }

        component.deleteEntry(deleteLookup);
        expect(lookupService.deleteEntry).toHaveBeenCalled();
    });
});
