import { createClient } from "@/lib/supabase/server";

interface DynamicContentProps {
  slug: string;
  fallback: React.ReactNode;
  className?: string;
}

/**
 * Sanitize HTML by stripping dangerous tags (script, iframe, object, embed, form)
 * and event handlers. Allows safe formatting tags like <br>, <b>, <i>, <span>.
 */
function sanitizeHtml(html: string): string {
  return html
    // Remove script/iframe/object/embed/form tags and their content
    .replace(/<(script|iframe|object|embed|form|style|link|meta)\b[^]*?<\/\1>/gi, '')
    // Remove self-closing dangerous tags
    .replace(/<(script|iframe|object|embed|link|meta)\b[^]*?\/?>/gi, '')
    // Remove event handlers (onclick, onload, onerror, etc.)
    .replace(/\s*on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]*)/gi, '')
    // Remove javascript: protocol in href/src
    .replace(/(href|src)\s*=\s*(['"]?)javascript:/gi, '$1=$2#');
}

export async function DynamicContent({ slug, fallback, className }: DynamicContentProps) {
  let content: string | null = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("content_blocks")
      .select("content")
      .eq("slug", slug)
      .eq("active", true)
      .single();

    if (data && data.content) {
      content = data.content;
    }
  } catch {
    // Silent fail to fallback
  }

  if (content) {
    const sanitized = sanitizeHtml(content);
    return (
      <span className={className} dangerouslySetInnerHTML={{ __html: sanitized }} />
    );
  }

  return (
    <span className={className}>{fallback}</span>
  );
}
