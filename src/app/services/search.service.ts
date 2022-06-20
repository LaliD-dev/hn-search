import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AddSearch } from '../store/actions';
import { SearchResponse } from '../models/searchResponse';
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
    // add query to store
    const url = this.constructQuery(search);
    this.store.dispatch(AddSearch({url}));
    console.log(url)

    // perform search
    return this.http.get<SearchResponse>(url);
  }

  constructQuery(search: Search): string {
    let query = '';

    if (search.query && search.query !== '') {
      query  = "query=" + (search.query ?? '');
    }

    if (search.page) {
      query = query + '&page=' + search.page;
    }

    if (search.tags && search.tags.length > 0) {
      let tagsString = '(' + search.tags.join(',') + ')';
      query = query + '&tags=' + tagsString;
    }

    if (search.begin_date) {
      query = query + '&numericFilters=created_at_i>=' + this.convertToSeconds(search.begin_date);
      if (search.end_date) {
        query = query + ',created_at_i<=' + this.convertToSeconds(search.end_date);
      }
    }
    else if (search.end_date) {
      query = query + '&numericFilters=created_at_i<=' + this.convertToSeconds(search.end_date);
    }

    return ((search.begin_date || search.end_date) ? this.searchByDateUrl : this.searchUrl) + query ;
  }

  convertToSeconds(dateToConvert: Date): number {
    return dateToConvert.getTime()/1000;
  }
}
