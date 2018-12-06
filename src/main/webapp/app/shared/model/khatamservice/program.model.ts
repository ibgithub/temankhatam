import { IQori } from 'app/shared/model/khatamservice/qori.model';

export interface IProgram {
    id?: number;
    programName?: string;
    readingLevel?: string;
    freeTime?: string;
    totalMonths?: number;
    totalWeeks?: number;
    ayahPerWeek?: number;
    isTeam?: boolean;
    desc?: string;
    qori?: IQori;
}

export class Program implements IProgram {
    constructor(
        public id?: number,
        public programName?: string,
        public readingLevel?: string,
        public freeTime?: string,
        public totalMonths?: number,
        public totalWeeks?: number,
        public ayahPerWeek?: number,
        public isTeam?: boolean,
        public desc?: string,
        public qori?: IQori
    ) {
        this.isTeam = this.isTeam || false;
    }
}
