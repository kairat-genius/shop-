import { useMemo, useState } from "react";

import type { FittingReportTableType, SizeType } from "@/types/size-table.type";

export const useSizeTable = (
  size: SizeType,
  fittingReportTable: FittingReportTableType,
) => {
  const sizeList = size.sizeList;

  const [activeUnit, setActiveUnit] = useState("cm");

  const tableData = useMemo(() => {
    const activeSizeData =
      sizeList.find((list) => list.title === activeUnit) ?? sizeList[0];

    const allKeys = [
      ...(activeSizeData?.sizeKeyList ?? []),
      ...(activeSizeData?.sizeParameterList ?? []),
    ];

    const columns = allKeys.map((item) => item.sizeKey);

    const rowCount = allKeys[0]?.sizeValueList.length ?? 0;

    const rows = Array.from({ length: rowCount }, (_, rowIndex) =>
      allKeys.map((item) => item.sizeValueList[rowIndex] ?? ""),
    );

    return {
      columns,
      rows,
    };
  }, [activeUnit, sizeList]);

  const fittingReportData = useMemo(
    () =>
      fittingReportTable?.sizeUnitGroups.find(
        (group) => group.unit === activeUnit,
      ) ?? null,
    [activeUnit, fittingReportTable],
  );

  return {
    activeUnit,
    setActiveUnit,
    tableData,
    fittingReportData,
    sizeList,
  };
};
