import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TemankhatamSharedModule } from 'app/shared';
import {
    SurahComponent,
    SurahDetailComponent,
    SurahUpdateComponent,
    SurahDeletePopupComponent,
    SurahDeleteDialogComponent,
    surahRoute,
    surahPopupRoute
} from './';

const ENTITY_STATES = [...surahRoute, ...surahPopupRoute];

@NgModule({
    imports: [TemankhatamSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [SurahComponent, SurahDetailComponent, SurahUpdateComponent, SurahDeleteDialogComponent, SurahDeletePopupComponent],
    entryComponents: [SurahComponent, SurahUpdateComponent, SurahDeleteDialogComponent, SurahDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TemankhatamSurahModule {}
