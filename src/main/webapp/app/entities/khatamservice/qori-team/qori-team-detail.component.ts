import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQoriTeam } from 'app/shared/model/khatamservice/qori-team.model';

@Component({
    selector: 'jhi-qori-team-detail',
    templateUrl: './qori-team-detail.component.html'
})
export class QoriTeamDetailComponent implements OnInit {
    qoriTeam: IQoriTeam;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qoriTeam }) => {
            this.qoriTeam = qoriTeam;
        });
    }

    previousState() {
        window.history.back();
    }
}
