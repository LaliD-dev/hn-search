import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { SearchResponse } from '../models/searchResponse';
import { SearchResult } from '../models/searchResult';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchUrl = 'http://hn.algolia.com/api/v1/search?';
  private searchByDateUrl = 'http://hn.algolia.com/api/v1/search_by_date?';

  searches: string[] = ['http://hn.algolia.com/api/v1/search?query=foo',
'http://hn.algolia.com/api/v1/search?query=bar']

  constructor(
    private http: HttpClient) { }

  getSearchResponse(searchTerm: string): Observable<SearchResponse> {
    const url = this.constructQuery(searchTerm);
    console.log(url)
    this.searches.push(url)

    return this.http.get<SearchResponse>(url);
  }

  constructQuery(searchTerm: string): string {
    const query  = "query=" + (searchTerm ?? '');
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
