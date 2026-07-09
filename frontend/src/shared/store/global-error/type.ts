export type GlobalErrorStateType = {
  apiErrorStatus: number | null;
  setApiErrorStatus: (status: number | null) => void;
  clearApiError: () => void;
}