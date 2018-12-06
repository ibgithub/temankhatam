import { IAyah } from 'app/shared/model/khatamservice/ayah.model';

export interface ISurah {
    id?: number;
    surahNameArabic?: string;
    surahNamePego?: string;
    transIndo?: string;
    transEng?: string;
    totalAyah?: number;
    makkiyahMadaniyah?: string;
    historyIndo?: string;
    historyEng?: string;
    desc?: string;
    ayahs?: IAyah[];
}

export class Surah implements ISurah {
    constructor(
        public id?: number,
        public surahNameArabic?: string,
        public surahNamePego?: string,
        public transIndo?: string,
        public transEng?: string,
        public totalAyah?: number,
        public makkiyahMadaniyah?: string,
        public historyIndo?: string,
        public historyEng?: string,
        public desc?: string,
        public ayahs?: IAyah[]
    ) {}
}
