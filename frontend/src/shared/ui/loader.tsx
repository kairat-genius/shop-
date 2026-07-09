import { cn } from "../utils/clsx";

interface LoaderProps {
  className?: string;
}

const Loader = ({ className }: LoaderProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-30 flex items-center justify-center bg-white/70 animate-fade-in transition-opacity duration-200",
        className,
      )}
    >
      <span className="h-10 w-10 rounded-full border-3 border-transparent border-t-green animate-spin" />
    </div>
  );
};

export default Loader;
