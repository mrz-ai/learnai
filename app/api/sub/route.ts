import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  return NextResponse.json("this is result");
}
