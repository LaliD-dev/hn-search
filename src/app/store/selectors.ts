import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from './search.state';

// export const selectSearchState = createFeatureSelector<SearchState>("searchHistory");

//export const getSearchState = (state: SearchState) => state;
//export const getSearchHistory = createSelector(getSearchState, (state) => state.searchHistory);

export const selectSearchHistory = (state: SearchState) => state.searchHistory;
export const getSearchHistory = createSelector(selectSearchHistory, (state) => state);

