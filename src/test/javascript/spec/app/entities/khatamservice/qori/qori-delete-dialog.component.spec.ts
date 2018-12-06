/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TemankhatamTestModule } from '../../../../test.module';
import { QoriDeleteDialogComponent } from 'app/entities/khatamservice/qori/qori-delete-dialog.component';
import { QoriService } from 'app/entities/khatamservice/qori/qori.service';

describe('Component Tests', () => {
    describe('Qori Management Delete Component', () => {
        let comp: QoriDeleteDialogComponent;
        let fixture: ComponentFixture<QoriDeleteDialogComponent>;
        let service: QoriService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TemankhatamTestModule],
                declarations: [QoriDeleteDialogComponent]
            })
                .overrideTemplate(QoriDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(QoriDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QoriService);
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
