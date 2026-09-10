import type { SizeAssistantModuleType } from "@/types/product-detail.type";
import { useState, useMemo } from "react";


export const useSizeTable = (sizeAssistantModule: SizeAssistantModuleType) => {
  const defaultUnit =
    sizeAssistantModule.sizeUnits.find((u) => u.selected)?.unit || "cm";
  const [activeUnit, setActiveUnit] = useState(defaultUnit);

  const tableData = useMemo(() => {
    const activeSizeData =
      sizeAssistantModule.size.sizeList.find(
        (list) => list.title === activeUnit
      ) || sizeAssistantModule.size.sizeList[0];

    const allKeys = [
      ...(activeSizeData?.sizeKeyList || []),
      ...(activeSizeData?.sizeParameterList || []),
    ];

    const columns = allKeys.map((item) => item.sizeKey);
    const rowCount = allKeys[0]?.sizeValueList.length || 0;
    const rows = [];

    for (let i = 0; i < rowCount; i++) {
      const row = allKeys.map((item) => item.sizeValueList[i] || "");
      rows.push(row);
    }

    return { columns, rows };
  }, [activeUnit, sizeAssistantModule]);

  const columnCount = tableData.columns.length;
  const isManyColumns = columnCount >= 8;

  return {
    activeUnit,
    setActiveUnit,
    tableData,
    isManyColumns,
  };
};