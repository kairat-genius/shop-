import { cn } from "@/shared/utils/clsx";
import { Styles } from "./styles";
import RouterLink, {type LinkProps as RouterLinkProps} from "next/link";
import type { ReactNode } from "react";

interface LinkProps extends RouterLinkProps {
  children: ReactNode;
  className?: string;
}

const Link = ({
  className,
  children,
  ...props
}: LinkProps) => {
  return (
    <RouterLink
      className={cn(
        Styles,
        className,
      )}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

Link.displayName = "Link";

export default Link;
