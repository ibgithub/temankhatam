import { IQori } from 'app/shared/model/khatamservice/qori.model';

export interface IQoriTeam {
    id?: number;
    teamTitle?: string;
    member1?: number;
    member2?: number;
    member3?: number;
    member4?: number;
    member5?: number;
    member6?: number;
    member7?: number;
    member8?: number;
    member9?: number;
    member10?: number;
    desc?: string;
    qori?: IQori;
}

export class QoriTeam implements IQoriTeam {
    constructor(
        public id?: number,
        public teamTitle?: string,
        public member1?: number,
        public member2?: number,
        public member3?: number,
        public member4?: number,
        public member5?: number,
        public member6?: number,
        public member7?: number,
        public member8?: number,
        public member9?: number,
        public member10?: number,
        public desc?: string,
        public qori?: IQori
    ) {}
}
