import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISurah } from 'app/shared/model/khatamservice/surah.model';

type EntityResponseType = HttpResponse<ISurah>;
type EntityArrayResponseType = HttpResponse<ISurah[]>;

@Injectable({ providedIn: 'root' })
export class SurahService {
    private resourceUrl = SERVER_API_URL + 'khatamservice/api/surahs';

    constructor(private http: HttpClient) {}

    create(surah: ISurah): Observable<EntityResponseType> {
        return this.http.post<ISurah>(this.resourceUrl, surah, { observe: 'response' });
    }

    update(surah: ISurah): Observable<EntityResponseType> {
        return this.http.put<ISurah>(this.resourceUrl, surah, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISurah>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISurah[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
