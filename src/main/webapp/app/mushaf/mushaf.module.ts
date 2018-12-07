import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TemankhatamSharedModule } from '../shared';

import { MUSHAF_ROUTE, MushafComponent } from './';

@NgModule({
    imports: [
      TemankhatamSharedModule,
      RouterModule.forRoot([ MUSHAF_ROUTE ], { useHash: true })
    ],
    declarations: [
      MushafComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TemankhatamMushafModule {}
