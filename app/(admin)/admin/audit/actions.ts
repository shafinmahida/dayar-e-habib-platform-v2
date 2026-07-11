"use server";

import { createAdminClient } from "@/lib/supabase/admin";

export async function getSystemUsers() {
  const supabaseAdmin = createAdminClient();
  
  // Fetch users from the secure auth schema
  const { data: users, error } = await supabaseAdmin.auth.admin.listUsers();
  
  if (error) {
    console.error("Failed to fetch system users", error);
    return [];
  }

  // Fetch profiles to map names to emails
  const { data: profiles } = await supabaseAdmin
    .from("profiles")
    .select("id, full_name, role");

  return users.users.map(user => {
    const profile = profiles?.find(p => p.id === user.id);
    return {
      id: user.id,
      email: user.email,
      last_sign_in_at: user.last_sign_in_at,
      created_at: user.created_at,
      full_name: profile?.full_name || user.user_metadata?.full_name || "Unknown",
      role: profile?.role || user.user_metadata?.role || "user"
    };
  });
}
