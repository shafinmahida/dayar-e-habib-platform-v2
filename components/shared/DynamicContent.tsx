import { createClient } from "@/lib/supabase/server";

interface DynamicContentProps {
  slug: string;
  fallback: React.ReactNode;
  className?: string;
}

export async function DynamicContent({ slug, fallback, className }: DynamicContentProps) {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("content_blocks")
      .select("content")
      .eq("slug", slug)
      .eq("active", true)
      .single();

    if (data && data.content) {
      return (
        <span className={className} dangerouslySetInnerHTML={{ __html: data.content }} />
      );
    }
  } catch (e) {
    // Silent fail to fallback
  }

  return (
    <span className={className}>{fallback}</span>
  );
}
