import { Moment } from 'moment';
import { IAyah } from 'app/shared/model/khatamservice/ayah.model';
import { IQoriTeam } from 'app/shared/model/khatamservice/qori-team.model';
import { IProgram } from 'app/shared/model/khatamservice/program.model';
import { IQori } from 'app/shared/model/khatamservice/qori.model';

export const enum ProfileVisibility {
    VISIBLE = 'VISIBLE',
    ONLY_MY_TEAM = 'ONLY_MY_TEAM',
    INVISIBLE = 'INVISIBLE'
}

export interface IQori {
    id?: number;
    fullName?: string;
    userLogin?: string;
    birthDate?: Moment;
    gender?: string;
    email?: string;
    phoneNumber?: string;
    profession?: string;
    address?: string;
    motto?: string;
    avatar?: string;
    profileVisibility?: ProfileVisibility;
    isTeam?: boolean;
    desc?: string;
    ayah?: IAyah;
    qoriTeam?: IQoriTeam;
    program?: IProgram;
    qoriMates?: IQori[];
    qoriFriends?: IQori[];
}

export class Qori implements IQori {
    constructor(
        public id?: number,
        public fullName?: string,
        public userLogin?: string,
        public birthDate?: Moment,
        public gender?: string,
        public email?: string,
        public phoneNumber?: string,
        public profession?: string,
        public address?: string,
        public motto?: string,
        public avatar?: string,
        public profileVisibility?: ProfileVisibility,
        public isTeam?: boolean,
        public desc?: string,
        public ayah?: IAyah,
        public qoriTeam?: IQoriTeam,
        public program?: IProgram,
        public qoriMates?: IQori[],
        public qoriFriends?: IQori[]
    ) {
        this.isTeam = this.isTeam || false;
    }
}
