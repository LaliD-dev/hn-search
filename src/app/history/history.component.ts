import { Component, OnInit, } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit  {
  searches$: Observable<string[]> = of([]);

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searches$ = this.searchService.getSearches()
  }

}
