import { createClient } from "@/lib/supabase/server";
import { EnlightenmentClient } from "./EnlightenmentClient";

export async function Enlightenment() {
  const supabase = await createClient();
  const { data: places } = await supabase
    .from("enlightenment_places")
    .select("*")
    .order("created_at", { ascending: true });

  return <EnlightenmentClient places={places || []} />;
}
