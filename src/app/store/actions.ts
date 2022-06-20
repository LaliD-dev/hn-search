import { createAction, props } from '@ngrx/store';

/*
export enum SearchActionEnum {
    GetSearches = '[Search] Get list of searches',
    GetSearchesSuccess = '[Search] Get list of searches success',
    AddSearch = '[Search] Add search to list of searches',
    AddSearchSuccess = '[Search] Add search to list of searches success',
}
*/

export const GetSearchHistory = createAction(
    '[Search] Get list of searches'
);


export const GetSearchHistorySuccess = createAction(
    '[Search] Get list of searches success',
    props<{data: string[]}>()
)


export const AddSearch = createAction(
    '[Search] Add search to list of searches',
    props<{url: string}>()
);

/*
export const AddSearchSuccess = createAction(
    SearchActionEnum.AddSearchSuccess,
    props<{data: string[]}>()
)
*/