import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ayah } from 'app/shared/model/khatamservice/ayah.model';
import { AyahService } from './ayah.service';
import { AyahComponent } from './ayah.component';
import { AyahDetailComponent } from './ayah-detail.component';
import { AyahUpdateComponent } from './ayah-update.component';
import { AyahDeletePopupComponent } from './ayah-delete-dialog.component';
import { IAyah } from 'app/shared/model/khatamservice/ayah.model';

@Injectable({ providedIn: 'root' })
export class AyahResolve implements Resolve<IAyah> {
    constructor(private service: AyahService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((ayah: HttpResponse<Ayah>) => ayah.body));
        }
        return of(new Ayah());
    }
}

export const ayahRoute: Routes = [
    {
        path: 'ayah',
        component: AyahComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'temankhatamApp.khatamserviceAyah.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ayah/:id/view',
        component: AyahDetailComponent,
        resolve: {
            ayah: AyahResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'temankhatamApp.khatamserviceAyah.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ayah/new',
        component: AyahUpdateComponent,
        resolve: {
            ayah: AyahResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'temankhatamApp.khatamserviceAyah.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ayah/:id/edit',
        component: AyahUpdateComponent,
        resolve: {
            ayah: AyahResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'temankhatamApp.khatamserviceAyah.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ayahPopupRoute: Routes = [
    {
        path: 'ayah/:id/delete',
        component: AyahDeletePopupComponent,
        resolve: {
            ayah: AyahResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'temankhatamApp.khatamserviceAyah.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
