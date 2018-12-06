import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQoriTeam } from 'app/shared/model/khatamservice/qori-team.model';
import { QoriTeamService } from './qori-team.service';

@Component({
    selector: 'jhi-qori-team-delete-dialog',
    templateUrl: './qori-team-delete-dialog.component.html'
})
export class QoriTeamDeleteDialogComponent {
    qoriTeam: IQoriTeam;

    constructor(private qoriTeamService: QoriTeamService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qoriTeamService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qoriTeamListModification',
                content: 'Deleted an qoriTeam'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qori-team-delete-popup',
    template: ''
})
export class QoriTeamDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qoriTeam }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QoriTeamDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.qoriTeam = qoriTeam;
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
