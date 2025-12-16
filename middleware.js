// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// async function decodeToken(token) {
//   console.log("Token from middleware", token);
  
//   try {
//     const { payload } = await jwtVerify(token, SECRET);
//     return payload; // Contains { id, role, ... }
//   } catch (err) {
//     return null;
//   }
// }
// export async function middleware(req) {
//   const adminToken = req.cookies.get("adminToken")?.value;
//   const ownerToken = req.cookies.get("ownerToken")?.value;
//   const companyToken = req.cookies.get("companyToken")?.value;

//   const path = req.nextUrl.pathname;

//   const adminData = adminToken ? await decodeToken(adminToken) : null;
//   const ownerData = ownerToken ? await decodeToken(ownerToken) : null;
//   const companyData = companyToken ? await decodeToken(companyToken) : null;

//   // PUBLIC ROUTES
//   if (path === "/login") {
//     if (adminData?.role === "Admin") {
//       return NextResponse.redirect(
//         new URL("/admin-dashboard/dashboard", req.url)
//       );
//     }
//     if (ownerData?.role === "PropertyOwner") {
//       return NextResponse.redirect(
//         new URL("/owner-dashboard/dashboard", req.url)
//       );
//     }
//     if (companyData?.role === "company") {
//       return NextResponse.redirect(
//         new URL("/company-dashboard/dashboard", req.url)
//       );
//     }
//     return NextResponse.next();
//   }

//   // ADMIN PROTECTED ROUTES
//   if (path.startsWith("/admin-dashboard")) {
//     if (!adminData || adminData.role !== "Admin") {
//       return NextResponse.redirect(new URL("/admin-login", req.url));
//     }
//   }

//   // OWNER PROTECTED ROUTES
//   if (path.startsWith("/owner-dashboard")) {
//     if (!ownerData || ownerData.role !== "PropertyOwner") {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   }

//   // COMPANY PROTECTED ROUTES
//   if (path.startsWith("/company-dashboard")) {
//     if (!companyData || companyData.role !== "company") {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/login",
//     "/admin-dashboard/:path*",
//     "/owner-dashboard/:path*",
//     "/company-dashboard/:path*",
//   ],
// };

// import { NextResponse } from "next/server";


// export function middleware(req) {
//   const token = req.cookies.get("auth_token")?.value;
//   const pathname = req.nextUrl.pathname;
// console.log("Token value", token);

//   // Public routes
//   if (pathname === "/login" || pathname === "/admin-login") {
//     if (token) {
//       return NextResponse.redirect(
//         new URL("/admin-dashboard/dashboard", req.url)
//       );
//     }
//     return NextResponse.next();
//   }

//   // Protected routes
//   if (
//     pathname.startsWith("/admin-dashboard") ||
//     pathname.startsWith("/owner-dashboard") ||
//     pathname.startsWith("/company-dashboard")
//   ) {
//     if (!token) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/login",
//     "/admin-login",
//     "/admin-dashboard/:path*",
//     "/owner-dashboard/:path*",
//     "/company-dashboard/:path*",
//   ],
// };

import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // 🔑 Just check cookie existence (FAST)
  const adminToken = req.cookies.get("adminToken");
  const ownerToken = req.cookies.get("ownerToken");
  const companyToken = req.cookies.get("companyToken");

  /* ---------------- PUBLIC LOGIN ROUTE ---------------- */
  if (pathname === "/login") {
    if (adminToken) {
      return NextResponse.redirect(
        new URL("/admin-dashboard/dashboard", req.url)
      );
    }
    if (ownerToken) {
      return NextResponse.redirect(
        new URL("/owner-dashboard/dashboard", req.url)
      );
    }
    if (companyToken) {
      return NextResponse.redirect(
        new URL("/company-dashboard/dashboard", req.url)
      );
    }
    return NextResponse.next();
  }

  /* ---------------- ADMIN PROTECTED ---------------- */
  if (pathname.startsWith("/admin-dashboard") && !adminToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  /* ---------------- OWNER PROTECTED ---------------- */
  if (pathname.startsWith("/owner-dashboard") && !ownerToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  /* ---------------- COMPANY PROTECTED ---------------- */
  if (pathname.startsWith("/company-dashboard") && !companyToken) {
    return NextResponse.redirect(new URL("/login", req.url));
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


