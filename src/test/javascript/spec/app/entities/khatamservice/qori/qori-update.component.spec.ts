/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TemankhatamTestModule } from '../../../../test.module';
import { QoriUpdateComponent } from 'app/entities/khatamservice/qori/qori-update.component';
import { QoriService } from 'app/entities/khatamservice/qori/qori.service';
import { Qori } from 'app/shared/model/khatamservice/qori.model';

describe('Component Tests', () => {
    describe('Qori Management Update Component', () => {
        let comp: QoriUpdateComponent;
        let fixture: ComponentFixture<QoriUpdateComponent>;
        let service: QoriService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TemankhatamTestModule],
                declarations: [QoriUpdateComponent]
            })
                .overrideTemplate(QoriUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(QoriUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QoriService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Qori(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.qori = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Qori();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.qori = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
