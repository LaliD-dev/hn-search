import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SearchResult } from 'src/app/models/searchResult';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, AfterViewInit {

  currentIndex = 0;
  leftIndex = 0;
  pageNumbersToShow: number[] = [];

  @Input() searchResults: SearchResult[] = [];
  @Input() pageNumbers: number[] = [];
  @Input() totalPages: number = 0;

  @Output() pageNumberChanged: EventEmitter<number> = new EventEmitter();

  searchResults$: Observable<SearchResult[]> = of(this.searchResults);

  constructor() {
    this.searchResults$    
      .pipe()
      .subscribe(
        () => {this.setPageNumbersToShow()}
      );
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    console.log(this.pageNumbersToShow);
    this.setPageNumbersToShow()
    console.log(this.pageNumbersToShow)
  }

  changePageRange(increment: number): void {
    if (increment < 0 && this.leftIndex > 0) {
      this.leftIndex -= 1;
      this.setPageNumbersToShow();
    }
    else if (this.leftIndex < this.totalPages - 3) {
      this.leftIndex += 1;
      this.setPageNumbersToShow();
    }
  }

  setPageNumbersToShow(): void {
    let clonedPageNumbers = [...this.pageNumbers];
    this.pageNumbersToShow = clonedPageNumbers.splice(this.leftIndex, 3);
  }

  changePage(pageNumber: number): void {
    this.currentIndex = pageNumber - 1;
    if ((0 <= this.currentIndex ) && (this.currentIndex <= this.totalPages - 1))
    {
      this.pageNumberChanged.emit(pageNumber);
    }
  }

}
