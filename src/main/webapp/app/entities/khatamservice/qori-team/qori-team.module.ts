import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TemankhatamSharedModule } from 'app/shared';
import {
    QoriTeamComponent,
    QoriTeamDetailComponent,
    QoriTeamUpdateComponent,
    QoriTeamDeletePopupComponent,
    QoriTeamDeleteDialogComponent,
    qoriTeamRoute,
    qoriTeamPopupRoute
} from './';

const ENTITY_STATES = [...qoriTeamRoute, ...qoriTeamPopupRoute];

@NgModule({
    imports: [TemankhatamSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QoriTeamComponent,
        QoriTeamDetailComponent,
        QoriTeamUpdateComponent,
        QoriTeamDeleteDialogComponent,
        QoriTeamDeletePopupComponent
    ],
    entryComponents: [QoriTeamComponent, QoriTeamUpdateComponent, QoriTeamDeleteDialogComponent, QoriTeamDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TemankhatamQoriTeamModule {}
