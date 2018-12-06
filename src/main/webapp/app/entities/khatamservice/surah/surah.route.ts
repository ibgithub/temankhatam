import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Surah } from 'app/shared/model/khatamservice/surah.model';
import { SurahService } from './surah.service';
import { SurahComponent } from './surah.component';
import { SurahDetailComponent } from './surah-detail.component';
import { SurahUpdateComponent } from './surah-update.component';
import { SurahDeletePopupComponent } from './surah-delete-dialog.component';
import { ISurah } from 'app/shared/model/khatamservice/surah.model';

@Injectable({ providedIn: 'root' })
export class SurahResolve implements Resolve<ISurah> {
    constructor(private service: SurahService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((surah: HttpResponse<Surah>) => surah.body));
        }
        return of(new Surah());
    }
}

export const surahRoute: Routes = [
    {
        path: 'surah',
        component: SurahComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'temankhatamApp.khatamserviceSurah.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'surah/:id/view',
        component: SurahDetailComponent,
        resolve: {
            surah: SurahResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'temankhatamApp.khatamserviceSurah.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'surah/new',
        component: SurahUpdateComponent,
        resolve: {
            surah: SurahResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'temankhatamApp.khatamserviceSurah.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'surah/:id/edit',
        component: SurahUpdateComponent,
        resolve: {
            surah: SurahResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'temankhatamApp.khatamserviceSurah.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const surahPopupRoute: Routes = [
    {
        path: 'surah/:id/delete',
        component: SurahDeletePopupComponent,
        resolve: {
            surah: SurahResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'temankhatamApp.khatamserviceSurah.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
