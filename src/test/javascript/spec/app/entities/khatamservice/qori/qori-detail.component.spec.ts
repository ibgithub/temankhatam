/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TemankhatamTestModule } from '../../../../test.module';
import { QoriDetailComponent } from 'app/entities/khatamservice/qori/qori-detail.component';
import { Qori } from 'app/shared/model/khatamservice/qori.model';

describe('Component Tests', () => {
    describe('Qori Management Detail Component', () => {
        let comp: QoriDetailComponent;
        let fixture: ComponentFixture<QoriDetailComponent>;
        const route = ({ data: of({ qori: new Qori(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TemankhatamTestModule],
                declarations: [QoriDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(QoriDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(QoriDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.qori).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
