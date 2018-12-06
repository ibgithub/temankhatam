import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISurah } from 'app/shared/model/khatamservice/surah.model';
import { Principal } from 'app/core';
import { SurahService } from './surah.service';

@Component({
    selector: 'jhi-surah',
    templateUrl: './surah.component.html'
})
export class SurahComponent implements OnInit, OnDestroy {
    surahs: ISurah[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private surahService: SurahService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.surahService.query().subscribe(
            (res: HttpResponse<ISurah[]>) => {
                this.surahs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSurahs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISurah) {
        return item.id;
    }

    registerChangeInSurahs() {
        this.eventSubscriber = this.eventManager.subscribe('surahListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
