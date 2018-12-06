/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TemankhatamTestModule } from '../../../../test.module';
import { QoriTeamDetailComponent } from 'app/entities/khatamservice/qori-team/qori-team-detail.component';
import { QoriTeam } from 'app/shared/model/khatamservice/qori-team.model';

describe('Component Tests', () => {
    describe('QoriTeam Management Detail Component', () => {
        let comp: QoriTeamDetailComponent;
        let fixture: ComponentFixture<QoriTeamDetailComponent>;
        const route = ({ data: of({ qoriTeam: new QoriTeam(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TemankhatamTestModule],
                declarations: [QoriTeamDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(QoriTeamDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(QoriTeamDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.qoriTeam).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
