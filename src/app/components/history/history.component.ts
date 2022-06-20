import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as SearchActions from '../../store/actions';
import { getSearchHistory } from '../../store/selectors';
import { SearchState } from 'src/app/store/search.state';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit  {
  searches$: Observable<string[]>;

  constructor(private store: Store<SearchState>) {
    this.searches$ = this.store.pipe(select(getSearchHistory));

    this.searches$.subscribe((data) => {
      console.log(data);
    })

    this.store.dispatch(SearchActions.GetSearchHistory());
  }

  ngOnInit(): void {
  }
}
