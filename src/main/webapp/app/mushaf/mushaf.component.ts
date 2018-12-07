import {Component, OnInit} from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AyahService } from '../entities/khatamservice/ayah/ayah.service';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITEMS_PER_PAGE } from 'app/shared';
import { IAyah } from 'app/shared/model/khatamservice/ayah.model';

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
  totalItems: any;
  queryCount: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  surahId: any;
  limit: any;
  offset: any;

  constructor(
    private ayahService: AyahService,
    private jhiAlertService: JhiAlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.surahId = this.activatedRoute.snapshot.params['surahId'];
    this.limit = this.activatedRoute.snapshot.params['limit'];
    this.offset = this.activatedRoute.snapshot.params['offset'];
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data['pagingParams'].page;
      this.previousPage = data['pagingParams'].page;
      this.reverse = data['pagingParams'].ascending;
      this.predicate = data['pagingParams'].predicate;
    });
  }

  ngOnInit() {
    this.loadAll();
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
        this.previousPage = page;
        this.transition();
    }
  }

  loadAll() {
    this.ayahService
        .queryBySurahId(this.surahId, this.limit, this.offset)
        .subscribe(
            (res: HttpResponse<IAyah[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpResponse<any>) => this.onError(res.body)
        );
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
        result.push('id');
    }
    return result;
  }

  transition() {
    this.router.navigate(['/mushaf'], {
        queryParams: {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }
    });
    this.loadAll();
  }

  private onSuccess(data, headers) {
    this.totalItems = headers.get('X-Total-Count');
    this.queryCount = this.totalItems;
    this.ayahs = data;
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
