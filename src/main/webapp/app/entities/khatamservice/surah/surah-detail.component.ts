import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISurah } from 'app/shared/model/khatamservice/surah.model';

@Component({
    selector: 'jhi-surah-detail',
    templateUrl: './surah-detail.component.html'
})
export class SurahDetailComponent implements OnInit {
    surah: ISurah;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ surah }) => {
            this.surah = surah;
        });
    }

    previousState() {
        window.history.back();
    }
}
