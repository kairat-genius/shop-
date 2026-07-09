import Icon from "@/shared/icon";
import Link from "next/link";

const Search = () => {
  return (
    <Link
      href="/goods/searchHistory"
      className="rounded-[1.067vw] border border-slate-300 flex items-center h-[8vw] bg-white w-full"
    >
      <div className="px-[2.133vw] flex items-center w-full">
        <div className="w-full text-[3.2vw] text-[rgb(199,199,215)] truncate select-none">
          anta kai 2
        </div>
      </div>
      <div
        className="w-[8.533vw] h-[8vw] flex items-center justify-center border-l shrink-0 text-teal-400 border-slate-300"
        style={{
          backgroundColor: "rgba(0, 254, 255, 0.05",
        }}
        aria-label="Поиск"
      >
        <Icon
          icon="search"
          className="w-[4.8vw] h-[4.8vw]"
        />
      </div>
    </Link>
  );
};

export default Search;
