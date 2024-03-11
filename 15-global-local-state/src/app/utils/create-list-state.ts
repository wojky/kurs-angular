import { Observable, combineLatest, map } from "rxjs";
import { LoadingState } from "../task/data-access/tasks.api.service";
import { ListState, LIST_STATE_VALUE } from "./list-state.type";

export function createListState<S, R extends Array<unknown>>(
  state$: Observable<S>,
  loadingState$: Observable<LoadingState>,
  selector: (state: S) => R,
): Observable<ListState<R[number]>> {
  return combineLatest([state$, loadingState$]).pipe(
    map(([state, loadingState]) => {
      if (loadingState.idle) {
        return { state: LIST_STATE_VALUE.IDLE };
      }

      if (loadingState.loading) {
        return { state: LIST_STATE_VALUE.LOADING };
      }

      if (loadingState.error) {
        return {
          state: LIST_STATE_VALUE.ERROR,
          error: loadingState.error,
        };
      }

      return { state: LIST_STATE_VALUE.SUCCESS, results: selector(state) };
    }),
  );
}
