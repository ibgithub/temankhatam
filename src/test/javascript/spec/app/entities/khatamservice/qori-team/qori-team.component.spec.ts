/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TemankhatamTestModule } from '../../../../test.module';
import { QoriTeamComponent } from 'app/entities/khatamservice/qori-team/qori-team.component';
import { QoriTeamService } from 'app/entities/khatamservice/qori-team/qori-team.service';
import { QoriTeam } from 'app/shared/model/khatamservice/qori-team.model';

describe('Component Tests', () => {
    describe('QoriTeam Management Component', () => {
        let comp: QoriTeamComponent;
        let fixture: ComponentFixture<QoriTeamComponent>;
        let service: QoriTeamService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TemankhatamTestModule],
                declarations: [QoriTeamComponent],
                providers: []
            })
                .overrideTemplate(QoriTeamComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(QoriTeamComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QoriTeamService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new QoriTeam(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.qoriTeams[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
