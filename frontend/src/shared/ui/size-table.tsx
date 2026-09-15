import { cn } from "@/shared/utils/clsx";

interface SizeTableProps {
  columns: string[];
  rows: string[][];
  isManyColumns?: boolean;
  isScrolled?: boolean;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  onClick?: () => void;
  stickyFirstColumn?: boolean;
}

const SizeTable = ({
  columns,
  rows,
  isManyColumns = false,
  isScrolled = false,
  onScroll,
  onClick,
  stickyFirstColumn = false,
}: SizeTableProps) => {
  return (
    <div
      onScroll={onScroll}
      className={cn(
        "rounded border border-slate-200",
        isManyColumns ? "overflow-x-auto" : "overflow-hidden",
      )}
    >
      <table
        onClick={onClick}
        className={cn(
          "text-center border-separate border-spacing-0 min-w-full",
          isManyColumns ? "max-w-max table-fixed" : "table-fixed",
        )}
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
                            ? "1.6vw 0 2.667vw -1.067vw rgba(0,0,0,.15)"
                            : "none",
                          transition: "box-shadow .2s ease-in-out",
                        }
                      : undefined
                  }
                  className="text-center border-r border-b border-slate-200 px-1 py-1.5 text-slate-500 bg-slate-100"
                >
                  {column}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className="text-[12px] leading-[normal]">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="whitespace-nowrap">
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
                              ? "1.6vw 0 2.667vw -1.067vw rgba(0,0,0,.15)"
                              : "none",
                            transition: "box-shadow 0.2s ease-in-out",
                          }
                        : undefined
                    }
                    className={cn(
                      "border-r border-slate-200 px-1 py-1.5 min-w-[53.375px]",
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