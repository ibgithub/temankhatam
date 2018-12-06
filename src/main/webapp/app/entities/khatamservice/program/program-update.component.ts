import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IProgram } from 'app/shared/model/khatamservice/program.model';
import { ProgramService } from './program.service';
import { IQori } from 'app/shared/model/khatamservice/qori.model';
import { QoriService } from 'app/entities/khatamservice/qori';

@Component({
    selector: 'jhi-program-update',
    templateUrl: './program-update.component.html'
})
export class ProgramUpdateComponent implements OnInit {
    private _program: IProgram;
    isSaving: boolean;

    qoris: IQori[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private programService: ProgramService,
        private qoriService: QoriService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ program }) => {
            this.program = program;
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
        if (this.program.id !== undefined) {
            this.subscribeToSaveResponse(this.programService.update(this.program));
        } else {
            this.subscribeToSaveResponse(this.programService.create(this.program));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProgram>>) {
        result.subscribe((res: HttpResponse<IProgram>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get program() {
        return this._program;
    }

    set program(program: IProgram) {
        this._program = program;
    }
}
