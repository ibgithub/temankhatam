import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TemankhatamSharedModule } from 'app/shared';
import {
    QoriComponent,
    QoriDetailComponent,
    QoriUpdateComponent,
    QoriDeletePopupComponent,
    QoriDeleteDialogComponent,
    qoriRoute,
    qoriPopupRoute
} from './';

const ENTITY_STATES = [...qoriRoute, ...qoriPopupRoute];

@NgModule({
    imports: [TemankhatamSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [QoriComponent, QoriDetailComponent, QoriUpdateComponent, QoriDeleteDialogComponent, QoriDeletePopupComponent],
    entryComponents: [QoriComponent, QoriUpdateComponent, QoriDeleteDialogComponent, QoriDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TemankhatamQoriModule {}
