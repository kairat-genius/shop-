import { useToast } from '@/shared/toast';
import type { FieldValues, UseFormSetError } from 'react-hook-form';
import { processServerErrors } from '../utils/handleServerError';

type ServerErrorType = Record<string, string[] | string>;

export function useServerFieldErrors<T extends FieldValues>() {
  const { showToast } = useToast();

  const handleServerError = (
    response: ServerErrorType,
    setError: UseFormSetError<T>
  ) => {
    processServerErrors({ response, setError, showToast });
  };
  

  return { handleServerError };
}