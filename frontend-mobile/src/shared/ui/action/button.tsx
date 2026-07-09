import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/shared/utils/clsx";
import { Styles } from "./styles";

const Button = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button">
>(({ className, children, ...props }, ref) => {
  return (
    <button
      type="button"
      ref={ref}
      className={cn(Styles, className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
