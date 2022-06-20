import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AddSearch } from '../store/actions';
import { SearchResponse } from '../models/searchResponse';
import { SearchResult } from '../models/searchResult';
import { Search } from '../models/search';
import { SearchState } from '../store/search.state';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchUrl = 'http://hn.algolia.com/api/v1/search?';
  private searchByDateUrl = 'http://hn.algolia.com/api/v1/search_by_date?';

  constructor(
    private http: HttpClient,
    private store: Store<SearchState>) { }

  getSearchResponse(search: Search): Observable<SearchResponse> {
    // save query
    const url = this.constructQuery(search);
    this.store.dispatch(AddSearch({url}));

    // perform search
    return this.http.get<SearchResponse>(url);
  }

  constructQuery(search: Search): string {
    let query = ''
    if (search.query && search.query != '') {
      query  = "query=" + (search.query ?? '');
    }

    if (search.page) {
      query = query + '&page=' + search.page;
    }
    return  this.searchUrl + query ;
  }

  constructDateFilter(): string {
    return '';
  }

  convertToSeconds(dateToConvert: Date): number {
    return dateToConvert.getTime()/1000;
  }
}
