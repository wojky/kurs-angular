export const TASK_STATUS = {
  ALL: "ALL",
  TODO: "TODO",
  DONE: "DONE",
} as const;

export type TaskStatus = keyof typeof TASK_STATUS;
