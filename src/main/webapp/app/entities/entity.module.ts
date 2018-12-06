import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TemankhatamSurahModule as KhatamserviceSurahModule } from './khatamservice/surah/surah.module';
import { TemankhatamAyahModule as KhatamserviceAyahModule } from './khatamservice/ayah/ayah.module';
import { TemankhatamQoriModule as KhatamserviceQoriModule } from './khatamservice/qori/qori.module';
import { TemankhatamProgramModule as KhatamserviceProgramModule } from './khatamservice/program/program.module';
import { TemankhatamQoriTeamModule as KhatamserviceQoriTeamModule } from './khatamservice/qori-team/qori-team.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        KhatamserviceSurahModule,
        KhatamserviceAyahModule,
        KhatamserviceQoriModule,
        KhatamserviceProgramModule,
        KhatamserviceQoriTeamModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TemankhatamEntityModule {}
