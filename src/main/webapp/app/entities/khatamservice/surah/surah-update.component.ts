import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISurah } from 'app/shared/model/khatamservice/surah.model';
import { SurahService } from './surah.service';

@Component({
    selector: 'jhi-surah-update',
    templateUrl: './surah-update.component.html'
})
export class SurahUpdateComponent implements OnInit {
    private _surah: ISurah;
    isSaving: boolean;

    constructor(private surahService: SurahService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ surah }) => {
            this.surah = surah;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.surah.id !== undefined) {
            this.subscribeToSaveResponse(this.surahService.update(this.surah));
        } else {
            this.subscribeToSaveResponse(this.surahService.create(this.surah));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISurah>>) {
        result.subscribe((res: HttpResponse<ISurah>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get surah() {
        return this._surah;
    }

    set surah(surah: ISurah) {
        this._surah = surah;
    }
}
