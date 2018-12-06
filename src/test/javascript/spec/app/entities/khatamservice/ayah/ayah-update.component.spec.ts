/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TemankhatamTestModule } from '../../../../test.module';
import { AyahUpdateComponent } from 'app/entities/khatamservice/ayah/ayah-update.component';
import { AyahService } from 'app/entities/khatamservice/ayah/ayah.service';
import { Ayah } from 'app/shared/model/khatamservice/ayah.model';

describe('Component Tests', () => {
    describe('Ayah Management Update Component', () => {
        let comp: AyahUpdateComponent;
        let fixture: ComponentFixture<AyahUpdateComponent>;
        let service: AyahService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TemankhatamTestModule],
                declarations: [AyahUpdateComponent]
            })
                .overrideTemplate(AyahUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AyahUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AyahService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Ayah(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ayah = entity;
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
                    const entity = new Ayah();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ayah = entity;
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
