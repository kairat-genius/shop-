import { cn } from "@/shared/utils/clsx";

interface FittingReportTableProps {
  data: {
    unit: string;
    sizeColumns: {
      title: string;
      cells: string[];
    }[];
  };
  models: {
    cells: {
      headImage?: string;
      nickname: string;
      id: number;
    }[];
    title: string;
  };
  isScrolled?: boolean;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  onClick?: () => void;
  stickyFirstColumn?: boolean;
}

const FittingReportTable = ({
  data,
  isScrolled = false,
  onScroll,
  onClick,
  stickyFirstColumn = false,
  models,
}: FittingReportTableProps) => {
  const rowCount = data.sizeColumns[0]?.cells.length ?? 0;

  return (
    <div
      onScroll={onScroll}
      className="scrollbar overflow-hidden rounded border border-slate-200 max-[1180px]:overflow-x-auto"
    >
      <table
        onClick={onClick}
        className="w-full min-w-full table-fixed border-separate border-spacing-0 text-center"
      >
        <thead>
          <tr className="font-roboto_condensed text-[14px] font-semibold leading-[normal]">
            <th
              style={
                stickyFirstColumn
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
              className="border-b border-r border-slate-200 bg-slate-100 px-1 py-1.5 text-center text-slate-500"
            >
              {models.title}
            </th>
            {data.sizeColumns.map((column) => (
              <th
                key={column.title}
                className="border-b border-r border-slate-200 bg-slate-100 px-1 py-1.5 text-center text-slate-500"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-[12px] leading-[normal]">
          {Array.from({ length: rowCount }, (_, rowIndex) => {
            const model = models.cells[rowIndex];

            return (
              <tr key={model?.id ?? rowIndex} className="whitespace-nowrap">
                <td
                  style={
                    stickyFirstColumn
                      ? {
                          position: "sticky",
                          left: 0,
                          zIndex: 20,
                          boxShadow: isScrolled
                            ? "1.6vw 0 2.667vw -1.067vw rgba(0, 0, 0, 0.15)"
                            : "none",
                          transition: "box-shadow 0.2s ease-in-out",
                        }
                      : undefined
                  }
                  className={cn(
                    "min-w-[53.375px] border-r border-slate-200 px-1 py-1.5 font-medium",
                    rowIndex % 2 === 0 ? "bg-white" : "bg-[#f6f6f7]",
                  )}
                >
                  {model?.nickname && (
                    <div className="flex items-center justify-center gap-1.5">
                      {model.headImage ? (
                        <img
                          className="rounded-full h-3.5 w-3.5 object-contain mr-0.5"
                          src={model.headImage}
                          alt=""
                        />
                      ) : (
                        <div className="text-[12px] leading-[normal] rounded-full h-3.5 w-3.5 shrink-0 bg-slate-150 text-slate-300 mr-1">
                          {model.nickname}
                        </div>
                      )}

                      <span className="text-[12px] leading-[normal]">
                        {model.nickname}
                      </span>
                    </div>
                  )}
                </td>

                {data.sizeColumns.map((column) => (
                  <td
                    key={column.title}
                    className={cn(
                      "min-w-[53.375px] border-r border-slate-200 px-1 py-1.5",
                      rowIndex % 2 === 0 ? "bg-white" : "bg-[#f6f6f7]",
                    )}
                  >
                    {column.cells[rowIndex] ?? ""}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FittingReportTable;
