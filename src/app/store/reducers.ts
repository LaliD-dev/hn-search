import { createReducer, on } from '@ngrx/store';
import { AddSearch, GetSearchHistory } from './actions';
import { initialSearchState } from './search.state';

export const reducer = createReducer(
    initialSearchState,
    on(AddSearch, (state, { url }) => ({
        ...state,
        searchHistory: addSearch(state.searchHistory, url)
    })),
    on(GetSearchHistory, (state) => {
        return state;
    })
)

function addSearch(searches: string[], url: string): string[] {
    console.log('Adding search')
    let copy = [];

    searches.forEach(search => copy.push(search));
    copy.push(url);

    console.log(copy)
    return copy;
}
