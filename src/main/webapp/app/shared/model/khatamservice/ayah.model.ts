import { ISurah } from 'app/shared/model/khatamservice/surah.model';
import { IQori } from 'app/shared/model/khatamservice/qori.model';

export interface IAyah {
    id?: number;
    surahAyah?: number;
    ayahArabic?: string;
    ayahPego?: string;
    transIndo?: string;
    transEng?: string;
    historyIndo?: string;
    historyEng?: string;
    desc?: string;
    surah?: ISurah;
    qori?: IQori;
}

export class Ayah implements IAyah {
    constructor(
        public id?: number,
        public surahAyah?: number,
        public ayahArabic?: string,
        public ayahPego?: string,
        public transIndo?: string,
        public transEng?: string,
        public historyIndo?: string,
        public historyEng?: string,
        public desc?: string,
        public surah?: ISurah,
        public qori?: IQori
    ) {}
}
