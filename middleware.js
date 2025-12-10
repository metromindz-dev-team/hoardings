import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function decodeToken(token) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload; // Contains { id, role, ... }
  } catch (err) {
    return null;
  }
}
export async function middleware(req) {
  const adminToken = req.cookies.get("adminToken")?.value;
  const ownerToken = req.cookies.get("ownerToken")?.value;
  const companyToken = req.cookies.get("companyToken")?.value;

  const path = req.nextUrl.pathname;

  const adminData = adminToken ? await decodeToken(adminToken) : null;
  const ownerData = ownerToken ? await decodeToken(ownerToken) : null;
  const companyData = companyToken ? await decodeToken(companyToken) : null;

  // PUBLIC ROUTES
  if (path === "/login") {
    if (adminData?.role === "Admin") {
      return NextResponse.redirect(
        new URL("/admin-dashboard/dashboard", req.url)
      );
    }
    if (ownerData?.role === "PropertyOwner") {
      return NextResponse.redirect(
        new URL("/owner-dashboard/dashboard", req.url)
      );
    }
    if (companyData?.role === "company") {
      return NextResponse.redirect(
        new URL("/company-dashboard/dashboard", req.url)
      );
    }
    return NextResponse.next();
  }

  // ADMIN PROTECTED ROUTES
  if (path.startsWith("/admin-dashboard")) {
    if (!adminData || adminData.role !== "Admin") {
      return NextResponse.redirect(new URL("/admin-login", req.url));
    }
  }

  // OWNER PROTECTED ROUTES
  if (path.startsWith("/owner-dashboard")) {
    if (!ownerData || ownerData.role !== "PropertyOwner") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // COMPANY PROTECTED ROUTES
  if (path.startsWith("/company-dashboard")) {
    if (!companyData || companyData.role !== "company") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/admin-dashboard/:path*",
    "/owner-dashboard/:path*",
    "/company-dashboard/:path*",
  ],
};
