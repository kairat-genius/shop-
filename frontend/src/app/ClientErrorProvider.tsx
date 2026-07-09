// @/shared/providers/ClientErrorProvider.tsx
"use client";

import useGlobalError from "@/shared/store/global-error";
import { Button } from "@/shared/ui/action";

export function ClientErrorProvider({ children }: { children: React.ReactNode }) {
  const { apiErrorStatus, clearApiError } = useGlobalError();

  // Если ошибок нет, просто рендерим приложение дальше
  if (!apiErrorStatus) return <>{children}</>;

  const is429 = apiErrorStatus === 429;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white p-6 text-center antialiased">
      <div className="max-w-md bg-white p-8 border border-gray-250 rounded-sm shadow-sm flex flex-col items-center">
        <h1 className="text-xl font-bold text-red-600 uppercase tracking-tight md:text-2xl">
          {is429 ? "TOO MANY REQUESTS (429)" : "SERVER ERROR (500)"}
        </h1>
        <p className="mt-4 text-sm text-gray-500 leading-relaxed">
          {is429 
            ? "Вы отправляете слишком много запросов. Пожалуйста, подождите немного и повторите попытку."
            : "На сервере произошел непредвиденный сбой. Мы уже занимаемся восстановлением работы."}
        </p>
        <Button 
          onClick={() => {
            clearApiError(); // Сбрасываем ошибку в сторе
            globalThis.window.location.reload(); // Перезагружаем страницу для повторного запроса
          }} 
          className="mt-8 bg-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-900 transition-colors w-full"
        >
          Повторить попытку
        </Button>
      </div>
    </div>
  );
}