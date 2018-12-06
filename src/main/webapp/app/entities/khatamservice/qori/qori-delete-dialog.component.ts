import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQori } from 'app/shared/model/khatamservice/qori.model';
import { QoriService } from './qori.service';

@Component({
    selector: 'jhi-qori-delete-dialog',
    templateUrl: './qori-delete-dialog.component.html'
})
export class QoriDeleteDialogComponent {
    qori: IQori;

    constructor(private qoriService: QoriService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qoriService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qoriListModification',
                content: 'Deleted an qori'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qori-delete-popup',
    template: ''
})
export class QoriDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qori }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QoriDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.qori = qori;
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
