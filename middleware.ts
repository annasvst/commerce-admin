// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: ["/api/public", "/sign-in", "/sign-up"],
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // Statik dosyaları hariç tut
    "/api/(.*)",
  ],
};
