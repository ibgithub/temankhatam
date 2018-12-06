import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAyah } from 'app/shared/model/khatamservice/ayah.model';
import { AyahService } from './ayah.service';
import { ISurah } from 'app/shared/model/khatamservice/surah.model';
import { SurahService } from 'app/entities/khatamservice/surah';
import { IQori } from 'app/shared/model/khatamservice/qori.model';
import { QoriService } from 'app/entities/khatamservice/qori';

@Component({
    selector: 'jhi-ayah-update',
    templateUrl: './ayah-update.component.html'
})
export class AyahUpdateComponent implements OnInit {
    private _ayah: IAyah;
    isSaving: boolean;

    surahs: ISurah[];

    qoris: IQori[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private ayahService: AyahService,
        private surahService: SurahService,
        private qoriService: QoriService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ayah }) => {
            this.ayah = ayah;
        });
        this.surahService.query().subscribe(
            (res: HttpResponse<ISurah[]>) => {
                this.surahs = res.body;
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
        if (this.ayah.id !== undefined) {
            this.subscribeToSaveResponse(this.ayahService.update(this.ayah));
        } else {
            this.subscribeToSaveResponse(this.ayahService.create(this.ayah));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAyah>>) {
        result.subscribe((res: HttpResponse<IAyah>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSurahById(index: number, item: ISurah) {
        return item.id;
    }

    trackQoriById(index: number, item: IQori) {
        return item.id;
    }
    get ayah() {
        return this._ayah;
    }

    set ayah(ayah: IAyah) {
        this._ayah = ayah;
    }
}
