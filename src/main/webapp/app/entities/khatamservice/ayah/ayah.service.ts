import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAyah } from 'app/shared/model/khatamservice/ayah.model';

type EntityResponseType = HttpResponse<IAyah>;
type EntityArrayResponseType = HttpResponse<IAyah[]>;

@Injectable({ providedIn: 'root' })
export class AyahService {
    private resourceUrl = SERVER_API_URL + 'khatamservice/api/ayahs';
    private resourceUrlBySurahId = SERVER_API_URL + 'khatamservice/api/ayahsBySurahIdLimitOffset';

    constructor(private http: HttpClient) {}

    create(ayah: IAyah): Observable<EntityResponseType> {
        return this.http.post<IAyah>(this.resourceUrl, ayah, { observe: 'response' });
    }

    update(ayah: IAyah): Observable<EntityResponseType> {
        return this.http.put<IAyah>(this.resourceUrl, ayah, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAyah>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAyah[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    queryBySurahId(surahId: number, limit: number, offset: number): Observable<EntityArrayResponseType> {
        return this.http.get<IAyah[]>(`${this.resourceUrlBySurahId}?surahId=${surahId}&limit=${limit}&offset=${offset}`, { observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
