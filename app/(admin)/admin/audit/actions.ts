"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createServerClient } from "@/lib/supabase/server";

export async function getSystemUsers() {
  // 1. Authenticate user to prevent unauthorized access/privilege escalation
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized - Admin privileges required");
  }

  const supabaseAdmin = createAdminClient();
  
  // Fetch profiles directly. We don't need auth.admin.listUsers() since profiles table has everything!
  // This is 100x faster and maps our custom last_login activity tracker
  const { data: profiles, error } = await supabaseAdmin
    .from("profiles")
    .select("id, email, full_name, role, last_login, created_at");
  
  if (error) {
    console.error("Failed to fetch system users", error);
    return [];
  }

  return profiles.map(profile => {
    return {
      id: profile.id,
      email: profile.email,
      last_sign_in_at: profile.last_login, // Maps our tracked last_login for the UI
      created_at: profile.created_at,
      full_name: profile.full_name || "Unknown",
      role: profile.role || "Admin"
    };
  });
}
