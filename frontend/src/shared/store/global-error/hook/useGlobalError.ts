import { useBoundStore } from "@/shared/store";

const useGlobalError = () => {
  const apiErrorStatus = useBoundStore((state) => state.apiErrorStatus);
  const setApiErrorStatus = useBoundStore((state) => state.setApiErrorStatus);
  const clearApiError = useBoundStore((state) => state.clearApiError);

  return { apiErrorStatus, setApiErrorStatus, clearApiError };
};

export default useGlobalError;