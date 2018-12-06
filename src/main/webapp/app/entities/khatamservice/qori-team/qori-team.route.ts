import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { QoriTeam } from 'app/shared/model/khatamservice/qori-team.model';
import { QoriTeamService } from './qori-team.service';
import { QoriTeamComponent } from './qori-team.component';
import { QoriTeamDetailComponent } from './qori-team-detail.component';
import { QoriTeamUpdateComponent } from './qori-team-update.component';
import { QoriTeamDeletePopupComponent } from './qori-team-delete-dialog.component';
import { IQoriTeam } from 'app/shared/model/khatamservice/qori-team.model';

@Injectable({ providedIn: 'root' })
export class QoriTeamResolve implements Resolve<IQoriTeam> {
    constructor(private service: QoriTeamService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((qoriTeam: HttpResponse<QoriTeam>) => qoriTeam.body));
        }
        return of(new QoriTeam());
    }
}

export const qoriTeamRoute: Routes = [
    {
        path: 'qori-team',
        component: QoriTeamComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'temankhatamApp.khatamserviceQoriTeam.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qori-team/:id/view',
        component: QoriTeamDetailComponent,
        resolve: {
            qoriTeam: QoriTeamResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'temankhatamApp.khatamserviceQoriTeam.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qori-team/new',
        component: QoriTeamUpdateComponent,
        resolve: {
            qoriTeam: QoriTeamResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'temankhatamApp.khatamserviceQoriTeam.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qori-team/:id/edit',
        component: QoriTeamUpdateComponent,
        resolve: {
            qoriTeam: QoriTeamResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'temankhatamApp.khatamserviceQoriTeam.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qoriTeamPopupRoute: Routes = [
    {
        path: 'qori-team/:id/delete',
        component: QoriTeamDeletePopupComponent,
        resolve: {
            qoriTeam: QoriTeamResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'temankhatamApp.khatamserviceQoriTeam.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
