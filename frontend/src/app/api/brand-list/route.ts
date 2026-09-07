import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const externalResponse = await fetch(
      `${process.env.API_URL}/brand-list`,
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
