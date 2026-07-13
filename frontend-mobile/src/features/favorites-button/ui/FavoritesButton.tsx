import { Button } from "@/shared/ui/action";
import { cn } from "@/shared/utils/clsx";
import type { ReactNode } from "react";

interface FavoriteButton {
  className?: string;
  children: ReactNode;
}

const FavoriteButton = ({ className, children }: FavoriteButton) => {
  return (
    <Button className={cn(className)}>
      {children}
    </Button>
  );
};

export default FavoriteButton;
