import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ spuId: string }> },
) {
  const { spuId } = await params;
  const { searchParams } = new URL(request.url);

  try {
    const externalResponse = await fetch(
      `${process.env.API_URL}/reviews/${spuId}?${searchParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.API_KEY || "",
        },
      },
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
