import { NextResponse } from "next/server";
import { fetchCatalogApi } from "@/shared/api/fetchCatalogApi";

export async function GET(request: Request) {
  try {
    const externalResponse = await fetchCatalogApi(
      `${process.env.API_URL}/category-tree`,
    );

    if (!externalResponse.ok) {
      return NextResponse.json(
        { error: `Ошибка внешнего API: ${externalResponse.statusText}` },
        { status: externalResponse.status },
      );
    }

    const data = await externalResponse.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    return NextResponse.json(
      { error: "Не удалось получить данные фильтров" },
      { status: 500 },
    );
  }
}
