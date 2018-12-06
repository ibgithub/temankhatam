import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQoriTeam } from 'app/shared/model/khatamservice/qori-team.model';

type EntityResponseType = HttpResponse<IQoriTeam>;
type EntityArrayResponseType = HttpResponse<IQoriTeam[]>;

@Injectable({ providedIn: 'root' })
export class QoriTeamService {
    private resourceUrl = SERVER_API_URL + 'khatamservice/api/qori-teams';

    constructor(private http: HttpClient) {}

    create(qoriTeam: IQoriTeam): Observable<EntityResponseType> {
        return this.http.post<IQoriTeam>(this.resourceUrl, qoriTeam, { observe: 'response' });
    }

    update(qoriTeam: IQoriTeam): Observable<EntityResponseType> {
        return this.http.put<IQoriTeam>(this.resourceUrl, qoriTeam, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IQoriTeam>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IQoriTeam[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
