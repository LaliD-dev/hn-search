import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Search } from '../../models/search';
import { SearchResponse } from '../../models/searchResponse';
import { SearchResult } from '../../models/searchResult';
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

  totalPages = 0;
  pageSize = 20;
  hits = 0;

  currentIndex = 0;
  leftIndex = 0;
  pageNumbers: number[] = [];
  pageNumbersToShow: number[] = [];

  search : Search = {
    query: '',
    tags: [],
    begin_date: null,
    end_date: null,
    page: 0
  }

  searchResults: SearchResult[]  = [ ];

  constructor(private searchService: SearchService ) {
    this.currentIndex = 0;
    this.leftIndex = 0;
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
        this.pageSize = data.hitsPerPage;
        this.hits = data.nbHits;

        this.search.page = data.page;
        this.currentIndex = data.page;

        this.pageNumbers = Array(this.totalPages).fill(0).map((x, i) => (i + 1));
        let clonedPageNumbers = [...this.pageNumbers];
        this.pageNumbersToShow = clonedPageNumbers.splice(this.leftIndex, 3);

        console.log(this.pageNumbersToShow);
        console.log(this.searchResults);
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

  changePageRange(increment: number): void {
    if (increment < 0 && this.leftIndex > 0) {
      this.leftIndex -= 1;
    }
    else if (this.leftIndex < this.totalPages - 1) {
      this.leftIndex += 1;
    }
  }

  ngOnDestroy(): void {
    // unsubscribe
  }
}
