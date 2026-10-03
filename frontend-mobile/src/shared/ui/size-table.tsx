import { cn } from "@/shared/utils/clsx";

interface SizeTableProps {
  columns: string[];
  rows: string[][];
  isScrolled?: boolean;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  onClick?: () => void;
  stickyFirstColumn?: boolean;
}

const SizeTable = ({
  columns,
  rows,
  isScrolled = false,
  onScroll,
  onClick,
  stickyFirstColumn = false,
}: SizeTableProps) => {
  return (
    <div
      onScroll={onScroll}
      className="mb-[3.2vw] overflow-x-auto scrollbar-none border border-slate-200 rounded-[1.067vw]"
    >
      <table
        onClick={onClick}
        className="min-w-max text-center w-full border-separate border-spacing-0"
      >
        <thead>
          <tr className="text-[14px] font-semibold leading-[normal] font-roboto_condensed">
            {columns.map((column, index) => {
              const isFirst = index === 0;
              const isSticky = stickyFirstColumn && isFirst;

              return (
                <th
                  key={column}
                  style={
                    isSticky
                      ? {
                          position: "sticky",
                          left: 0,
                          zIndex: 20,
                          boxShadow: isScrolled
                            ? "6px 0 10px -4px rgba(0, 0, 0, 0.15)"
                            : "none",
                          transition: "box-shadow .2s ease-in-out",
                        }
                      : undefined
                  }
                  className="w-[11.57vw] text-center border-r border-b border-slate-200 text-slate-500 bg-slate-100 py-[1.6vw] px-[1.067vw]"
                >
                  {column}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className="text-[2.933vw] leading-[normal] whitespace-nowrap">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => {
                const isFirst = cellIndex === 0;
                const isSticky = stickyFirstColumn && isFirst;

                return (
                  <td
                    key={cellIndex}
                    style={
                      isSticky
                        ? {
                            position: "sticky",
                            left: 0,
                            zIndex: 20,
                            boxShadow: isScrolled
                              ? "6px 0 10px -4px rgba(0, 0, 0, 0.15)"
                              : "none",
                            transition: "box-shadow .2s ease-in-out",
                          }
                        : undefined
                    }
                    className={cn(
                      "border-r border-slate-200 py-[1.6vw] px-[1.067vw]",
                      rowIndex % 2 === 0 ? "bg-white" : "bg-[#f6f6f7]",
                    )}
                  >
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SizeTable;
