/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TemankhatamTestModule } from '../../../../test.module';
import { AyahDetailComponent } from 'app/entities/khatamservice/ayah/ayah-detail.component';
import { Ayah } from 'app/shared/model/khatamservice/ayah.model';

describe('Component Tests', () => {
    describe('Ayah Management Detail Component', () => {
        let comp: AyahDetailComponent;
        let fixture: ComponentFixture<AyahDetailComponent>;
        const route = ({ data: of({ ayah: new Ayah(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TemankhatamTestModule],
                declarations: [AyahDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AyahDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AyahDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.ayah).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
