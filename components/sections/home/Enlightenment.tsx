import { createClient } from "@/lib/supabase/server";
import { EnlightenmentClient, EnlightenmentData } from "./EnlightenmentClient";

export async function Enlightenment() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("content_blocks")
    .select("content")
    .eq("slug", "homepage_enlightenment")
    .single();

  const enlightenmentData = data?.content as EnlightenmentData | undefined;

  return <EnlightenmentClient data={enlightenmentData as any} />;
}
