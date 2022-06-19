

export interface  Search {
    query: string,
    tags: string[],
    begin_date: Date | null,
    end_date: Date | null,
    page: number;
  }