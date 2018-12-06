/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TemankhatamTestModule } from '../../../../test.module';
import { SurahComponent } from 'app/entities/khatamservice/surah/surah.component';
import { SurahService } from 'app/entities/khatamservice/surah/surah.service';
import { Surah } from 'app/shared/model/khatamservice/surah.model';

describe('Component Tests', () => {
    describe('Surah Management Component', () => {
        let comp: SurahComponent;
        let fixture: ComponentFixture<SurahComponent>;
        let service: SurahService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TemankhatamTestModule],
                declarations: [SurahComponent],
                providers: []
            })
                .overrideTemplate(SurahComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SurahComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SurahService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Surah(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.surahs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
