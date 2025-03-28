import { auth } from "@/lib/auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(loginUrl);
  }

  if (req.auth && req.nextUrl.pathname === "/login") {
    const adminUrl = new URL("/admin/glance", req.nextUrl.origin);
    return Response.redirect(adminUrl);
  }

  if (req.nextUrl.pathname === "/admin") {
    const glanceUrl = new URL("/admin/glance", req.nextUrl.origin);
    return Response.redirect(glanceUrl);
  }
});

export const config = {
  matcher: ["/login", "/admin/:path*"],
};
