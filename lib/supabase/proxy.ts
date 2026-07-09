import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables.");
    // Fallback securely by redirecting to an error state or login
    if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('error', 'unconfigured');
      return NextResponse.redirect(url);
    }
    return NextResponse.next({ request });
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Do NOT use getSession() as it reads from storage
  // which may not be the same as the cookie. Use getUser() instead
  // which goes to the Supabase Auth server every time.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Normalize pathname to prevent bypasses via case changes or double-slashes
  const normalizedPath = request.nextUrl.pathname.toLowerCase().replace(/\/+/g, '/');

  // Protect /admin routes, but not /admin/login
  if (
    !user &&
    normalizedPath.startsWith('/admin') &&
    !normalizedPath.startsWith('/admin/login')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from login page
  if (
    user &&
    normalizedPath.startsWith('/admin/login')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: Return the supabaseResponse, not a new NextResponse
  return supabaseResponse
}
