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

    this.searchService.getSearchResponse(this.search)
      .subscribe((data: SearchResponse) =>
        {
          this.searchResults = data.hits;
          this.totalPages = data.nbPages;
          this.pageNumbers = Array(data.nbPages).fill(0).map((x, i) => (i + 1));
        }
    )
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

  ngOnDestroy(): void {
  }
}
