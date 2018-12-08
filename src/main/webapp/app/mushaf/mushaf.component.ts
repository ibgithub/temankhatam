import {Component, OnInit} from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AyahService } from '../entities/khatamservice/ayah/ayah.service';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITEMS_PER_PAGE } from 'app/shared';
import { IAyah } from 'app/shared/model/khatamservice/ayah.model';
import { ISurah } from 'app/shared/model/khatamservice/surah.model';

@Component({
  selector: 'jhi-mushaf',
  templateUrl: './mushaf.component.html',
  styleUrls: [
    'mushaf.scss'
  ]
})
export class MushafComponent implements OnInit {
  ayahs: IAyah[];
  error: any;
  success: any;
  routeData: any;
  itemsPerPage: any;
  surahId: any;
  limit: any;
  offset: any;
  surahName: any;

  strs: String[];
  surahIdBefore: any;
  surahIdAfter: any;
  offsetBefore: any;
  offsetAfter: any;

  constructor(
    private ayahService: AyahService,
    private jhiAlertService: JhiAlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((routeParams: ParamMap) => {
      this.myInit(routeParams);
      this.loadAll();
    });
  }

  myInit(routeParams: ParamMap) {
    console.log('myInit() triggered');
    this.surahId = +(routeParams.get('surahId'));
    this.limit = +(routeParams.get('limit'));
    this.offset = +(routeParams.get('offset'));
  }

  loadPage(page: number) {

  }

  loadAll() {
    this.ayahService
        .queryBySurahId(this.surahId, this.limit, this.offset)
        .subscribe(
            (res: HttpResponse<IAyah[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpResponse<any>) => this.onError(res.body)
        );
  }

  transition() {
    this.loadAll();
  }

  private onSuccess(data, headers) {
    this.ayahs = data;
    this.surahName = (<IAyah> this.ayahs[0]).surah.transIndo + ' - ' + (<IAyah> this.ayahs[0]).surah.surahNameArabic;
    this.ayahService
        .queryPagination(this.surahId, this.limit, this.offset)
        .subscribe(
            (res: HttpResponse<String[]>) => this.onSuccessString(res.body, res.headers),
            (res: HttpResponse<any>) => this.onError(res.body)
        );
  }

  private onSuccessString(data, headers) {
    this.strs = data;
    const before = this.strs[0].split(',');
    this.surahIdBefore = before[0];
    this.offsetBefore = before[1];

    const after = this.strs[1].split(',');
    this.surahIdAfter = after[0];
    this.offsetAfter = after[1];
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
