import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get("x-revalidate-secret");

    if (secret !== REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: "Invalid secret" },
        { status: 401 },
      );
    }

    revalidateTag("catalog", "max");

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
    });
  } catch {
    return NextResponse.json(
      { revalidated: false },
      { status: 500 },
    );
  }
}