import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IQoriTeam } from 'app/shared/model/khatamservice/qori-team.model';
import { QoriTeamService } from './qori-team.service';
import { IQori } from 'app/shared/model/khatamservice/qori.model';
import { QoriService } from 'app/entities/khatamservice/qori';

@Component({
    selector: 'jhi-qori-team-update',
    templateUrl: './qori-team-update.component.html'
})
export class QoriTeamUpdateComponent implements OnInit {
    private _qoriTeam: IQoriTeam;
    isSaving: boolean;

    qoris: IQori[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private qoriTeamService: QoriTeamService,
        private qoriService: QoriService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qoriTeam }) => {
            this.qoriTeam = qoriTeam;
        });
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
        if (this.qoriTeam.id !== undefined) {
            this.subscribeToSaveResponse(this.qoriTeamService.update(this.qoriTeam));
        } else {
            this.subscribeToSaveResponse(this.qoriTeamService.create(this.qoriTeam));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQoriTeam>>) {
        result.subscribe((res: HttpResponse<IQoriTeam>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackQoriById(index: number, item: IQori) {
        return item.id;
    }
    get qoriTeam() {
        return this._qoriTeam;
    }

    set qoriTeam(qoriTeam: IQoriTeam) {
        this._qoriTeam = qoriTeam;
    }
}
