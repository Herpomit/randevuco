import { initDatabase } from "@/backend/db/init-db";
import { NextResponse } from "next/server";

export const GET = async () => {
  const response = await initDatabase();
  return NextResponse.json(response);
};
