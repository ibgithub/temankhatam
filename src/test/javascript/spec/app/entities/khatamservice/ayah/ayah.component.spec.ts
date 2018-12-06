/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TemankhatamTestModule } from '../../../../test.module';
import { AyahComponent } from 'app/entities/khatamservice/ayah/ayah.component';
import { AyahService } from 'app/entities/khatamservice/ayah/ayah.service';
import { Ayah } from 'app/shared/model/khatamservice/ayah.model';

describe('Component Tests', () => {
    describe('Ayah Management Component', () => {
        let comp: AyahComponent;
        let fixture: ComponentFixture<AyahComponent>;
        let service: AyahService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TemankhatamTestModule],
                declarations: [AyahComponent],
                providers: []
            })
                .overrideTemplate(AyahComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AyahComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AyahService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Ayah(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.ayahs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
