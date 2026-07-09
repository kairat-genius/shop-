"use client";
import { Button } from "@/shared/ui/action";
import { postUserLogout } from "@/shared/api/user/postUserLogout";
import { useToast } from "@/shared/toast";
import { TOO_MANY_REQUESTS_MESSAGE } from "@/shared/settings";

const LogoutButton = () => {
  const { showToast } = useToast();

  const handleLogout = async () => {
    try {
      const { status, data } = await postUserLogout();

      if (status === 200) {
        globalThis.window.location.replace("/");
        return;
      }

      if (status === 429) {
        showToast(TOO_MANY_REQUESTS_MESSAGE, "invalid");
        return;
      }

      showToast(data?.error?.message ?? "Ошибка выхода", "error");
    } catch {
      showToast("Ошибка сети. Попробуйте снова.", "error");
    }
  };

  return (
    <Button
      className="p-3.5 border border-gray-250 text-green text-sm font-medium leading-normal"
      type="button"
      onClick={handleLogout}
    >
      Выйти
    </Button>
  );
};

export default LogoutButton;
