/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TemankhatamTestModule } from '../../../../test.module';
import { SurahUpdateComponent } from 'app/entities/khatamservice/surah/surah-update.component';
import { SurahService } from 'app/entities/khatamservice/surah/surah.service';
import { Surah } from 'app/shared/model/khatamservice/surah.model';

describe('Component Tests', () => {
    describe('Surah Management Update Component', () => {
        let comp: SurahUpdateComponent;
        let fixture: ComponentFixture<SurahUpdateComponent>;
        let service: SurahService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TemankhatamTestModule],
                declarations: [SurahUpdateComponent]
            })
                .overrideTemplate(SurahUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SurahUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SurahService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Surah(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.surah = entity;
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
                    const entity = new Surah();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.surah = entity;
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
