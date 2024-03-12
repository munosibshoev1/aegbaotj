import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import i18n from "@/app/i18n";

export function middleware(request: NextRequest) {
  const locale = request.nextUrl.locale;
  request.nextUrl.searchParams.set("lang", locale);
  request.nextUrl.href = request.nextUrl.href.replace(`/${locale}`, "");
  return NextResponse.rewrite(request.nextUrl);
}
