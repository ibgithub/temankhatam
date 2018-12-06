import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAyah } from 'app/shared/model/khatamservice/ayah.model';

@Component({
    selector: 'jhi-ayah-detail',
    templateUrl: './ayah-detail.component.html'
})
export class AyahDetailComponent implements OnInit {
    ayah: IAyah;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ayah }) => {
            this.ayah = ayah;
        });
    }

    previousState() {
        window.history.back();
    }
}
