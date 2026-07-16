"use client";

import { Button } from "@/shared/ui/action";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // 1. Извлекаем статус код из digest (например, из "STATUS:429" получим "429")
  const status = error.digest?.startsWith("STATUS:")
    ? error.digest.split(":")[1]
    : "500";

  // 2. Вручную заводим тексты для продакшена (так как error.message затерт)
  const errorContent = {
    "429": {
      title: "TOO MANY REQUESTS (429)",
      description:
        "Вы отправляете слишком много запросов. Пожалуйста, подождите минуту и обновите страницу.",
    },
    "403": {
      title: "ACCESS DENIED (403)",
      description:
        "У вас нет прав для просмотра этой страницы или запроса этих данных.",
    },
    "500": {
      title: "SERVER ERROR (500)",
      description:
        "На сервере произошел непредвиденный сбой. Мы уже занимаемся восстановлением работы сервиса.",
    },
  }[status] || {
    title: `SERVER ERROR (${status})`,
    description: "Произошла непредвиденная ошибка при загрузке данных.",
  };

  return (
    <html lang="ru">
      <body className="flex min-h-screen flex-col items-center justify-center p-6 text-center antialiased bg-gray-50">
        <div className="max-w-md flex flex-col justify-center items-center bg-white p-8 border border-gray-250 rounded-sm shadow-sm">
          {/* Безопасный заголовок */}
          <h1 className="text-[20px] font-bold text-red-600 uppercase tracking-tight md:text-[24px]">
            {errorContent.title}
          </h1>

          {/* Безопасное описание */}
          <p className="mt-4 text-[14px] text-gray-500 leading-relaxed">
            {errorContent.description}
          </p>

          <Button
            onClick={() => reset()}
            className="mt-8 bg-black text-white px-8 py-3 text-[14px] font-medium hover:bg-gray-900 transition-colors w-full"
          >
            Обновить страницу
          </Button>
        </div>
      </body>
    </html>
  );
}
