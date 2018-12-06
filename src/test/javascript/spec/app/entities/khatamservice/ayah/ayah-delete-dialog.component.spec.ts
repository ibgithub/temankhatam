/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TemankhatamTestModule } from '../../../../test.module';
import { AyahDeleteDialogComponent } from 'app/entities/khatamservice/ayah/ayah-delete-dialog.component';
import { AyahService } from 'app/entities/khatamservice/ayah/ayah.service';

describe('Component Tests', () => {
    describe('Ayah Management Delete Component', () => {
        let comp: AyahDeleteDialogComponent;
        let fixture: ComponentFixture<AyahDeleteDialogComponent>;
        let service: AyahService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TemankhatamTestModule],
                declarations: [AyahDeleteDialogComponent]
            })
                .overrideTemplate(AyahDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AyahDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AyahService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
