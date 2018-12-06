/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TemankhatamTestModule } from '../../../../test.module';
import { QoriComponent } from 'app/entities/khatamservice/qori/qori.component';
import { QoriService } from 'app/entities/khatamservice/qori/qori.service';
import { Qori } from 'app/shared/model/khatamservice/qori.model';

describe('Component Tests', () => {
    describe('Qori Management Component', () => {
        let comp: QoriComponent;
        let fixture: ComponentFixture<QoriComponent>;
        let service: QoriService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TemankhatamTestModule],
                declarations: [QoriComponent],
                providers: []
            })
                .overrideTemplate(QoriComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(QoriComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QoriService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Qori(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.qoris[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
