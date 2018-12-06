import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISurah } from 'app/shared/model/khatamservice/surah.model';
import { LoginModalService, Principal, Account } from 'app/core';
import { SurahService } from '../entities/khatamservice/surah/surah.service';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    surahs: ISurah[];

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private surahService: SurahService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager) {}

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
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
