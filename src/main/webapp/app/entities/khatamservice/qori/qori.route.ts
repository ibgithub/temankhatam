import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Qori } from 'app/shared/model/khatamservice/qori.model';
import { QoriService } from './qori.service';
import { QoriComponent } from './qori.component';
import { QoriDetailComponent } from './qori-detail.component';
import { QoriUpdateComponent } from './qori-update.component';
import { QoriDeletePopupComponent } from './qori-delete-dialog.component';
import { IQori } from 'app/shared/model/khatamservice/qori.model';

@Injectable({ providedIn: 'root' })
export class QoriResolve implements Resolve<IQori> {
    constructor(private service: QoriService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((qori: HttpResponse<Qori>) => qori.body));
        }
        return of(new Qori());
    }
}

export const qoriRoute: Routes = [
    {
        path: 'qori',
        component: QoriComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'temankhatamApp.khatamserviceQori.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qori/:id/view',
        component: QoriDetailComponent,
        resolve: {
            qori: QoriResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'temankhatamApp.khatamserviceQori.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qori/new',
        component: QoriUpdateComponent,
        resolve: {
            qori: QoriResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'temankhatamApp.khatamserviceQori.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qori/:id/edit',
        component: QoriUpdateComponent,
        resolve: {
            qori: QoriResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'temankhatamApp.khatamserviceQori.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qoriPopupRoute: Routes = [
    {
        path: 'qori/:id/delete',
        component: QoriDeletePopupComponent,
        resolve: {
            qori: QoriResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'temankhatamApp.khatamserviceQori.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
