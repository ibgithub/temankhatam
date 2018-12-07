import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { MushafComponent } from './';

export const MUSHAF_ROUTE: Route = {
  path: 'mushaf/:surahId/:limit/:offset',
  component: MushafComponent,
  data: {
    authorities: [],
    pageTitle: 'mushaf.title'
  },
  canActivate: [UserRouteAccessService]
};
