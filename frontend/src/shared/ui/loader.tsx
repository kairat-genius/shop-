import { cn } from "../utils/clsx";

interface LoaderProps {
  className?: string;
}

const Loader = ({ className }: LoaderProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-100 flex items-center justify-center bg-white/70 animate-fade-in transition-opacity duration-200",
        className,
      )}
    >
      <div className="w-10 h-10 animate-spin">
        <img
          className="object-contain"
          src="https://cdn-img.thepoizon.ru/node-common/45a0ec66-395e-e7a8-c213-25245aedaa89-120-120.png?x-oss-process=image/format,webp"
          alt="loading"
        />
      </div>
    </div>
  );
};

export default Loader;
