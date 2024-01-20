import { TASK_STATUS } from "../model/task-status.enum";
import { TasksListFiltersFormValue } from "../ui/task-list-filters.component";
import { GetAllTasksSearchParams } from "./tasks.service";

export function getAllTasksSearchParams(
  formValue: TasksListFiltersFormValue & { urgent?: boolean },
): GetAllTasksSearchParams {
  let searchParams = {
    _sort: "createdAt",
    _order: formValue.sortBy.toLocaleLowerCase(),
    q: formValue.searchTerm,
  } as GetAllTasksSearchParams;

  if (formValue.status === TASK_STATUS.TODO) {
    searchParams.done_like = "false";
  } else if (formValue.status === TASK_STATUS.DONE) {
    searchParams.done_like = "true";
  }

  if (formValue.urgent) {
    searchParams.urgent_like = "true";
  }

  return searchParams;
}
