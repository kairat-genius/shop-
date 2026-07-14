import { cn } from "../utils/clsx";

interface LoaderProps {
  className?: string;
}

const Loader = ({ className }: LoaderProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center fixed top-0 left-0 w-screen h-screen z-100",
        className,
      )}
    >
      <div className="flex-col w-[32vw] h-[32vw] bg-[rgba(50,50,50,.94)] rounded-[1.067vw] flex items-center justify-center">
        <img
          className="w-[10.133vw] h-[10.133vw] animate-spin"
          alt=""
          src="https://cdn-img.thepoizon.ru/node-common/c16c8997-3c4f-253f-4012-e399ea0503f6-114-114.png?x-oss-process=image/format,webp"
        />
        <div className="mt-[5.333vw] truncate max-w-[29.333vw] text-white leading-[3.733vw] text-[3.2vw] font-light">
          загрузка...
        </div>
      </div>
    </div>
  );
};

export default Loader;
