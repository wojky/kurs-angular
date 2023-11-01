export const SORT_BY = {
  ASC: "ASC",
  DESC: "DESC",
} as const;

export type SortBy = keyof typeof SORT_BY;
