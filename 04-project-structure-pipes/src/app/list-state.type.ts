export type ListFetchingError = { status: number; message: string };

// idle - initial
type IdleState = {
  state: "idle";
};
// loading
type LoadingState = {
  state: "loading";
};
// success
type SuccessState<T> = {
  state: "success";
  results: T[];
};
// error
type ErrorState = {
  state: "error";
  error: ListFetchingError;
};

export type ComponentListState<T> =
  | IdleState
  | LoadingState
  | SuccessState<T>
  | ErrorState;
