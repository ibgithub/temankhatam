import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISurah } from 'app/shared/model/khatamservice/surah.model';
import { SurahService } from './surah.service';

@Component({
    selector: 'jhi-surah-delete-dialog',
    templateUrl: './surah-delete-dialog.component.html'
})
export class SurahDeleteDialogComponent {
    surah: ISurah;

    constructor(private surahService: SurahService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.surahService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'surahListModification',
                content: 'Deleted an surah'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-surah-delete-popup',
    template: ''
})
export class SurahDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ surah }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SurahDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.surah = surah;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
