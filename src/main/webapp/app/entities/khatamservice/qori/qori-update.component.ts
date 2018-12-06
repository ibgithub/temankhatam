import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IQori } from 'app/shared/model/khatamservice/qori.model';
import { QoriService } from './qori.service';
import { IAyah } from 'app/shared/model/khatamservice/ayah.model';
import { AyahService } from 'app/entities/khatamservice/ayah';
import { IQoriTeam } from 'app/shared/model/khatamservice/qori-team.model';
import { QoriTeamService } from 'app/entities/khatamservice/qori-team';
import { IProgram } from 'app/shared/model/khatamservice/program.model';
import { ProgramService } from 'app/entities/khatamservice/program';

@Component({
    selector: 'jhi-qori-update',
    templateUrl: './qori-update.component.html'
})
export class QoriUpdateComponent implements OnInit {
    private _qori: IQori;
    isSaving: boolean;

    ayahs: IAyah[];

    qoriteams: IQoriTeam[];

    programs: IProgram[];

    qoris: IQori[];
    birthDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private qoriService: QoriService,
        private ayahService: AyahService,
        private qoriTeamService: QoriTeamService,
        private programService: ProgramService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qori }) => {
            this.qori = qori;
        });
        this.ayahService.query({ filter: 'qori(fullname)-is-null' }).subscribe(
            (res: HttpResponse<IAyah[]>) => {
                if (!this.qori.ayah || !this.qori.ayah.id) {
                    this.ayahs = res.body;
                } else {
                    this.ayahService.find(this.qori.ayah.id).subscribe(
                        (subRes: HttpResponse<IAyah>) => {
                            this.ayahs = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.qoriTeamService.query({ filter: 'qori(fullname)-is-null' }).subscribe(
            (res: HttpResponse<IQoriTeam[]>) => {
                if (!this.qori.qoriTeam || !this.qori.qoriTeam.id) {
                    this.qoriteams = res.body;
                } else {
                    this.qoriTeamService.find(this.qori.qoriTeam.id).subscribe(
                        (subRes: HttpResponse<IQoriTeam>) => {
                            this.qoriteams = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.programService.query({ filter: 'qori(fullname)-is-null' }).subscribe(
            (res: HttpResponse<IProgram[]>) => {
                if (!this.qori.program || !this.qori.program.id) {
                    this.programs = res.body;
                } else {
                    this.programService.find(this.qori.program.id).subscribe(
                        (subRes: HttpResponse<IProgram>) => {
                            this.programs = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.qoriService.query().subscribe(
            (res: HttpResponse<IQori[]>) => {
                this.qoris = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.qori.id !== undefined) {
            this.subscribeToSaveResponse(this.qoriService.update(this.qori));
        } else {
            this.subscribeToSaveResponse(this.qoriService.create(this.qori));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQori>>) {
        result.subscribe((res: HttpResponse<IQori>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackAyahById(index: number, item: IAyah) {
        return item.id;
    }

    trackQoriTeamById(index: number, item: IQoriTeam) {
        return item.id;
    }

    trackProgramById(index: number, item: IProgram) {
        return item.id;
    }

    trackQoriById(index: number, item: IQori) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get qori() {
        return this._qori;
    }

    set qori(qori: IQori) {
        this._qori = qori;
    }
}
