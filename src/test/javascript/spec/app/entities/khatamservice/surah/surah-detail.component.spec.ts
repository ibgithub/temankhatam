/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TemankhatamTestModule } from '../../../../test.module';
import { SurahDetailComponent } from 'app/entities/khatamservice/surah/surah-detail.component';
import { Surah } from 'app/shared/model/khatamservice/surah.model';

describe('Component Tests', () => {
    describe('Surah Management Detail Component', () => {
        let comp: SurahDetailComponent;
        let fixture: ComponentFixture<SurahDetailComponent>;
        const route = ({ data: of({ surah: new Surah(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TemankhatamTestModule],
                declarations: [SurahDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SurahDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SurahDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.surah).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
