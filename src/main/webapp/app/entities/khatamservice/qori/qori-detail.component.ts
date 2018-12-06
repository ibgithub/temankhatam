import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQori } from 'app/shared/model/khatamservice/qori.model';

@Component({
    selector: 'jhi-qori-detail',
    templateUrl: './qori-detail.component.html'
})
export class QoriDetailComponent implements OnInit {
    qori: IQori;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qori }) => {
            this.qori = qori;
        });
    }

    previousState() {
        window.history.back();
    }
}
