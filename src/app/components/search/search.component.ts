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
  tagsControl = new FormControl('');
  beginDateControl = new FormControl('');
  endDateControl = new FormControl('');
  greaterThanControl = new FormControl('');
  lessThanControl = new FormControl('');

  search : Search = {
    query: '',
    tags: [],
    begin_date: null,
    end_date: null,
    page: 0
  }

  searchResults: SearchResult[]  = [ ];

  constructor(private searchService: SearchService ) {
  }

  ngOnInit(): void {

  }

  performSearch(): void {
    this.search.query = this.searchTermControl.value ?? '';

    this.searchService.getSearchResponse(this.search.query)
    .subscribe((data: SearchResponse) =>
      {
        this.searchResults = data.hits;
        console.log(this.searchResults);
        }
    )
  }

  addChip(tag: string): void {
    // check if tag already exists
    let found = this.search.tags.find(item => item == tag);

    if (found === undefined) {
      this.search.tags.push(tag)
    }
  }

  removeChip(index: any): void {
    this.search.tags.splice(index, 1);
  }

  ngOnDestroy(): void {
    // unsubscribe
  }
}
