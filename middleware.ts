import {
  NextRequest,
  NextResponse
} from "next/server"

export function middleware(
  request: NextRequest
) {
  const token =
    request.cookies.get(
      "token"
    )

  const publicRoutes = [
    "/login",
    "/register",
    "/forgot-password"
  ]

  if (
    !token &&
    !publicRoutes.includes(
      request.nextUrl.pathname
    )
  ) {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/projects/:path*",
    "/tasks/:path*"
  ]
}