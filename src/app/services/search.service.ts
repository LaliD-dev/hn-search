import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AddSearch } from '../store/actions';
import { SearchResponse } from '../models/searchResponse';
import { SearchResult } from '../models/searchResult';
import { Search } from '../models/search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchUrl = 'http://hn.algolia.com/api/v1/search?';
  private searchByDateUrl = 'http://hn.algolia.com/api/v1/search_by_date?';

  searches: string[] = ['http://hn.algolia.com/api/v1/search?query=foo',
'http://hn.algolia.com/api/v1/search?query=bar']

  constructor(
    private http: HttpClient,
    private store: Store) { }

  getSearchResponse(search: Search): Observable<SearchResponse> {
    const url = this.constructQuery(search);
    console.log(url)
    this.store.dispatch(AddSearch({url}));

    return this.http.get<SearchResponse>(url);
  }

  constructQuery(search: Search): string {
    let query = ''
    if (search.query && search.query != '') {
      query  = "query=" + (search.query ?? '');
    }
    return  this.searchUrl + query ;
  }

  constructDateFilter(): string {
    return '';
  }

  convertToSeconds(dateToConvert: Date): number {
    return dateToConvert.getTime()/1000;
  }

  getSearches(): Observable<string[]> {
    console.log(this.searches)
    return of(this.searches);
  }
}
