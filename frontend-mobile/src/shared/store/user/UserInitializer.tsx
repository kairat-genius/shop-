'use client';
import { memo, useEffect } from "react";
import { useUserData } from "@/shared/store/user";
import { usePathname } from "next/navigation";

const UserDataInitializer = memo(() => {
  const { syncData } = useUserData();
  const pathname = usePathname();

  useEffect(() => {
    void syncData();
  }, [pathname, syncData]);

  return null;
});
UserDataInitializer.displayName = "UserDataInitializer";

export default UserDataInitializer;
