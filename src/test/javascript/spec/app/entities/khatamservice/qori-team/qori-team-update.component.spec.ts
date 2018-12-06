/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TemankhatamTestModule } from '../../../../test.module';
import { QoriTeamUpdateComponent } from 'app/entities/khatamservice/qori-team/qori-team-update.component';
import { QoriTeamService } from 'app/entities/khatamservice/qori-team/qori-team.service';
import { QoriTeam } from 'app/shared/model/khatamservice/qori-team.model';

describe('Component Tests', () => {
    describe('QoriTeam Management Update Component', () => {
        let comp: QoriTeamUpdateComponent;
        let fixture: ComponentFixture<QoriTeamUpdateComponent>;
        let service: QoriTeamService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TemankhatamTestModule],
                declarations: [QoriTeamUpdateComponent]
            })
                .overrideTemplate(QoriTeamUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(QoriTeamUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QoriTeamService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new QoriTeam(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.qoriTeam = entity;
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
                    const entity = new QoriTeam();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.qoriTeam = entity;
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
