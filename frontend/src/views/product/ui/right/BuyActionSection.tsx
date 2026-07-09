import { Button } from "@/shared/ui/action";

const BuyActionSection = () => {
  return (
    <div className="z-1 flex items-center gap-6 w-full sticky bottom-0 left-0 right-0 py-4 bg-white border-t border-slate-100 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
      <div className="w-10 shrink-0">
        <div className="text-[9px] leading-2.75 mt-px font-medium">
          114&nbsp;тыс.
        </div>
      </div>
      <Button className="px-3.75 h-12 py-0.75 bg text-xl font-bold font-roboto_condensed w-full bg-teal-350 rounded-sm">
        <span>Купить за 7&nbsp;304&nbsp;₽</span>
      </Button>
    </div>
  );
};

export default BuyActionSection;
