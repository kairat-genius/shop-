
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Link from "next/link";

interface SearchHistoryProps {
  items: string[];
  onClear: (e: React.MouseEvent) => void;
}

export const SearchHistory = ({
  items,
  onClear,
}: SearchHistoryProps) => {
  if (items.length === 0) return null;

  return (
    <section className="px-[3.733vw]">
      <div className="flex items-center justify-between pt-[5.333vw] pb-[3.2vw]">
        <div className="font-roboto_condensed font-bold text-[4.267vw] leading-[5.333vw]">
          Вы искали
        </div>
        <Button onClick={onClear}>
          <Icon
            className="w-[4.267vw] h-[4.267vw] text-[#AAAABB]"
            icon="trash-2"
          />
        </Button>
      </div>
      <div className="flex flex-wrap text-[3.2vw] leading-[normal]">
        {items.map((keyword, idx) => (
          <Link
            key={idx}
            href={`/search?keyword=${encodeURIComponent(keyword)}`}
            className="flex items-center justify-center px-[3.733vw] h-[6.667vw] bg-slate-150 rounded-[.533vw] mb-[1.6vw] mr-[1.6vw]"
          >
            <span className="truncate">{keyword}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};