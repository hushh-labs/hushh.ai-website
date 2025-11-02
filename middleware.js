import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Handle redirect from /pda to /products/personal-data-agent
    if (req.nextUrl.pathname === '/pda') {
      return NextResponse.redirect(new URL('/products/personal-data-agent', req.url))
    }

    // Handle redirect from /voice to Hushh Voice external URL
    if (req.nextUrl.pathname === '/voice') {
      return NextResponse.redirect('https://hushhvoice-2.onrender.com/')
    }

    // Handle redirect from /hushhwallet to Hushh Wallet external URL
    if (req.nextUrl.pathname === '/hushhwallet') {
      return NextResponse.redirect('https://hushh-wallet-app.vercel.app')
    }

    // Continue with auth middleware for protected routes
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow /pda redirect without authentication
        if (req.nextUrl.pathname === '/pda') {
          return true
        }
        
        // Allow /voice redirect without authentication
        if (req.nextUrl.pathname === '/voice') {
          return true
        }
        
        // Allow /hushhwallet redirect without authentication
        if (req.nextUrl.pathname === '/hushhwallet') {
          return true
        }
        
        // Require authentication for developer API routes
        if (req.nextUrl.pathname.startsWith('/developer-Api/content')) {
          return !!token
        }
        
        return true
      },
    },
  }
)

export const config = { 
  matcher: [
    "/pda",
    "/voice",
    "/hushhwallet",
    "/developer-Api/content"
  ] 
}