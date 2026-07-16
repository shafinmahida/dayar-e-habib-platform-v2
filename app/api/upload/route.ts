import { NextRequest, NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

// Initialize the Supabase admin client (Service Role Key bypasses RLS for storage insertion)
const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate user using the server client session
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized - Admin session required" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 2. Validate file type and size to prevent storage abuse
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "video/mp4", "video/quicktime"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
    }

    const maxBytes = 50 * 1024 * 1024; // 50MB limits
    if (file.size > maxBytes) {
      return NextResponse.json({ error: "File exceeds 50MB size limit" }, { status: 400 });
    }

    const fileExt = file.name.split('.').pop() || "bin";
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const buffer = await file.arrayBuffer();

    const { error } = await supabaseAdmin.storage
      .from('media')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (error) {
      console.error("Storage upload error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('media')
      .getPublicUrl(fileName);

    return NextResponse.json({ url: publicUrl });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown upload error";
    console.error("API error:", error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
