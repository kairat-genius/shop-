import FavoriteButton from "@/features/favorites-button";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Link from "next/link";

const BuyActionSection = () => {
  return (
    <div className="z-20 py-[2.667vw] px-[3.733vw] flex items-center w-full sticky bottom-0 left-0 right-0 bg-white border-t border-slate-100">
      <div className="pt-[2.133vw] flex">
        <FavoriteButton className="flex-col mr-[3.2vw]">
          <Icon icon="heart" className="w-[6.4vw] h-[6.4vw]" />
          <div className="text-[2.4vw] font-medium leading-[2.933vw]">
            114&nbsp;тыс.
          </div>
        </FavoriteButton>
        <Link href={"/"} className="flex items-center justify-center flex-col mr-[4.267vw]">
          <Icon icon="headset" className="w-[6.4vw] h-[6.4vw]" />
          <div className="text-[2.4vw] font-medium leading-[2.933vw]">
            Помощь
          </div>
        </Link>
      </div>
      <Button className="w-[72.267vw] h-[11.733vw] text-[4.8vw] leading-[normal] font-bold font-roboto_condensed rounded-[1.067vw] text-[#002f35] bg-teal-350">
        <span>Купить за 7&nbsp;304&nbsp;₽</span>
      </Button>
    </div>
  );
};

export default BuyActionSection;
