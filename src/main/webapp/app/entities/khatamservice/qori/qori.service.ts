import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQori } from 'app/shared/model/khatamservice/qori.model';

type EntityResponseType = HttpResponse<IQori>;
type EntityArrayResponseType = HttpResponse<IQori[]>;

@Injectable({ providedIn: 'root' })
export class QoriService {
    private resourceUrl = SERVER_API_URL + 'khatamservice/api/qoris';

    constructor(private http: HttpClient) {}

    create(qori: IQori): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qori);
        return this.http
            .post<IQori>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qori: IQori): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qori);
        return this.http
            .put<IQori>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQori>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQori[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(qori: IQori): IQori {
        const copy: IQori = Object.assign({}, qori, {
            birthDate: qori.birthDate != null && qori.birthDate.isValid() ? qori.birthDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.birthDate = res.body.birthDate != null ? moment(res.body.birthDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((qori: IQori) => {
            qori.birthDate = qori.birthDate != null ? moment(qori.birthDate) : null;
        });
        return res;
    }
}
