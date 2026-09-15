import type { ReactNode } from "react";

interface PopoverProps {
  children: ReactNode;
}

const Popover = ({ children }: PopoverProps) => {
  return (
    <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1 flex -translate-x-1/2 flex-col items-center opacity-0 transition-opacity group-hover:opacity-100">
      <div
        className="whitespace-nowrap p-3 bg-white"
        style={{
          boxShadow:
            "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        {children}
      </div>
      <div className="border-x-8 border-t-8 border-x-transparent border-t-white" />
    </div>
  );
};

export default Popover;
