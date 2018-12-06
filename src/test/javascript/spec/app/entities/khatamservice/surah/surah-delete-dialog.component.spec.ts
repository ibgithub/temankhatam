/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TemankhatamTestModule } from '../../../../test.module';
import { SurahDeleteDialogComponent } from 'app/entities/khatamservice/surah/surah-delete-dialog.component';
import { SurahService } from 'app/entities/khatamservice/surah/surah.service';

describe('Component Tests', () => {
    describe('Surah Management Delete Component', () => {
        let comp: SurahDeleteDialogComponent;
        let fixture: ComponentFixture<SurahDeleteDialogComponent>;
        let service: SurahService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TemankhatamTestModule],
                declarations: [SurahDeleteDialogComponent]
            })
                .overrideTemplate(SurahDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SurahDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SurahService);
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
