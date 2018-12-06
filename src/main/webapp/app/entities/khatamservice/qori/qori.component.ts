import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IQori } from 'app/shared/model/khatamservice/qori.model';
import { Principal } from 'app/core';
import { QoriService } from './qori.service';

@Component({
    selector: 'jhi-qori',
    templateUrl: './qori.component.html'
})
export class QoriComponent implements OnInit, OnDestroy {
    qoris: IQori[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private qoriService: QoriService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.qoriService.query().subscribe(
            (res: HttpResponse<IQori[]>) => {
                this.qoris = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQoris();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IQori) {
        return item.id;
    }

    registerChangeInQoris() {
        this.eventSubscriber = this.eventManager.subscribe('qoriListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
