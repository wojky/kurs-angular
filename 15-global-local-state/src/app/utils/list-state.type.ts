<<<<<<< HEAD
export type FetchingError = { status: number; message: string };
=======
export type ListFetchingError = { status: number; message: string };
>>>>>>> b6c31f86e8c758ce896fb9aaba471cdbf1af0f2a

// idle - initial
type IdleState = {
  state: LIST_STATE_VALUE["IDLE"];
};
// loading
type LoadingState = {
  state: LIST_STATE_VALUE["LOADING"];
};
// success
type SuccessState<T> = {
  state: LIST_STATE_VALUE["SUCCESS"];
  results: T[];
};
// error
type ErrorState = {
  state: LIST_STATE_VALUE["ERROR"];
<<<<<<< HEAD
  error: FetchingError;
=======
  error: ListFetchingError;
>>>>>>> b6c31f86e8c758ce896fb9aaba471cdbf1af0f2a
};

type LIST_STATE_VALUE = typeof LIST_STATE_VALUE;

export const LIST_STATE_VALUE = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
} as const;

export type ListStateValue = keyof typeof LIST_STATE_VALUE;

<<<<<<< HEAD
export type ListState<T> = IdleState | LoadingState | SuccessState<T> | ErrorState;
=======
export type ComponentListState<T> =
  | IdleState
  | LoadingState
  | SuccessState<T>
  | ErrorState;
>>>>>>> b6c31f86e8c758ce896fb9aaba471cdbf1af0f2a
