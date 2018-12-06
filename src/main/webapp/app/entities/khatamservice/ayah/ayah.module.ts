import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TemankhatamSharedModule } from 'app/shared';
import {
    AyahComponent,
    AyahDetailComponent,
    AyahUpdateComponent,
    AyahDeletePopupComponent,
    AyahDeleteDialogComponent,
    ayahRoute,
    ayahPopupRoute
} from './';

const ENTITY_STATES = [...ayahRoute, ...ayahPopupRoute];

@NgModule({
    imports: [TemankhatamSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [AyahComponent, AyahDetailComponent, AyahUpdateComponent, AyahDeleteDialogComponent, AyahDeletePopupComponent],
    entryComponents: [AyahComponent, AyahUpdateComponent, AyahDeleteDialogComponent, AyahDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TemankhatamAyahModule {}
