import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAyah } from 'app/shared/model/khatamservice/ayah.model';
import { Principal } from 'app/core';
import { AyahService } from './ayah.service';

@Component({
    selector: 'jhi-ayah',
    templateUrl: './ayah.component.html'
})
export class AyahComponent implements OnInit, OnDestroy {
    ayahs: IAyah[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ayahService: AyahService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.ayahService.query().subscribe(
            (res: HttpResponse<IAyah[]>) => {
                this.ayahs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAyahs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAyah) {
        return item.id;
    }

    registerChangeInAyahs() {
        this.eventSubscriber = this.eventManager.subscribe('ayahListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
