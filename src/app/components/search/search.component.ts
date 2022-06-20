import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Search } from '../../models/search';
import { SearchResponse } from '../../models/searchResponse';
import { SearchResult } from '../../models/searchResult';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  tagsList = ['story', 'comment', 'poll', 'pollopt', 'show_hn', 'ask_hn', 'front_page', 'author']

  searchTermControl = new FormControl('')
  beginDateControl = new FormControl('');
  endDateControl = new FormControl('');

  @ViewChild('searchResultsGrid')  searchResultsGrid!: SearchResultsComponent;

  totalPages = 0;
  pageNumbers: number[] = [];
  searchResults: SearchResult[]  = [ ];

  search : Search = {
    query: '',
    tags: [],
    begin_date: null,
    end_date: null,
    page: 0
  }

  constructor(private searchService: SearchService ) {

  }

  ngOnInit(): void {

  }

  performSearch(): void {
    this.search.query = this.searchTermControl.value ?? '';
    if (this.beginDateControl.value) {
      this.search.begin_date = this.getSearchDate(this.beginDateControl.value);
    }
    if (this.endDateControl.value) {
      this.search.end_date = this.getSearchDate(this.endDateControl.value);
    }

    this.searchService.getSearchResponse(this.search)
      .subscribe((data: SearchResponse) =>
        {
          this.searchResults = data.hits;
          this.totalPages = data.nbPages;
          this.pageNumbers = Array(data.nbPages).fill(0).map((x, i) => (i + 1));
        }
    )
  }

  getSearchDate(value: string): Date {
    let newDate = new Date(value);

    return newDate;
  }

  addChip(tag: string): void {
    let found = this.search.tags.find(item => item == tag);

    if (found === undefined) {
      this.search.tags.push(tag)
    }
  }

  removeChip(index: any): void {
    this.search.tags.splice(index, 1);
  }

  updateSearchResults(pageNumber: number): void {
    this.search.page = pageNumber - 1;
    this.performSearch();
  }

  clear(): void {
    this.totalPages = 0;
    this.pageNumbers = [];
    this.searchResults  = [ ];

    this.searchTermControl.setValue('');
    this.beginDateControl.setValue('');
    this.endDateControl.setValue('');
    
    this.search.tags = [];
    this.search.begin_date = null;
    this.search.end_date = null;
    this.search.page = 0;
  }

  ngOnDestroy(): void {
  }
}
