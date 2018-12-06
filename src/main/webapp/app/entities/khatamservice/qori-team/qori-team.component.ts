import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IQoriTeam } from 'app/shared/model/khatamservice/qori-team.model';
import { Principal } from 'app/core';
import { QoriTeamService } from './qori-team.service';

@Component({
    selector: 'jhi-qori-team',
    templateUrl: './qori-team.component.html'
})
export class QoriTeamComponent implements OnInit, OnDestroy {
    qoriTeams: IQoriTeam[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private qoriTeamService: QoriTeamService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.qoriTeamService.query().subscribe(
            (res: HttpResponse<IQoriTeam[]>) => {
                this.qoriTeams = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQoriTeams();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IQoriTeam) {
        return item.id;
    }

    registerChangeInQoriTeams() {
        this.eventSubscriber = this.eventManager.subscribe('qoriTeamListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
