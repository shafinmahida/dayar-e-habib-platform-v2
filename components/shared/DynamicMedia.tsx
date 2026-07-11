import { createClient } from "@/lib/supabase/server";
import { SmartMediaPlayer } from "@/components/shared/SmartMediaPlayer";

interface DynamicMediaProps {
  slug: string;
  fallbackUrl: string;
  type?: "image" | "video";
  className?: string;
  priority?: boolean;
}

export async function DynamicMedia({ slug, fallbackUrl, type = "image", className, priority = false }: DynamicMediaProps) {
  let url = fallbackUrl;
  
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("content_blocks")
      .select("content")
      .eq("slug", slug)
      .eq("active", true)
      .single();

    if (data && data.content && data.content.trim() !== "") {
      // The content field acts as the URL in this context
      // Strip out any HTML tags just in case they used the rich text editor
      url = data.content.replace(/(<([^>]+)>)/gi, "").trim();
    }
  } catch (e) {
    // Silent fail to fallback
  }

  return (
    <SmartMediaPlayer url={url} type={type} className={className} priority={priority} />
  );
}
