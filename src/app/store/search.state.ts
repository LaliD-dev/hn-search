export interface SearchState {
    searchHistory: string[];
}

export const initialSearchState: SearchState = {
    searchHistory: []
}

export function getInitialState(): SearchState {
    return initialSearchState;
}