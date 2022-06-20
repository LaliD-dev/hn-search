import { SearchResult } from "./searchResult"

export interface SearchResponse {
    hits: SearchResult[],
    page: number,
    nbHits: number,
    nbPages: number,
    hitsPerPage: number,
    processingTimeMS: number,
    query: string,
    params: string
}