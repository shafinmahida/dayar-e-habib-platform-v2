"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Calendar, ShieldCheck, Clock, Copy, MoreVertical, Edit2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('packages')
      .select(`
        *,
        package_categories(name)
      `)
      .order('display_order', { ascending: true });
      
    if (!error && data) {
      setPackages(data);
    }
    setLoading(false);
  };

  const handleDuplicate = async (pkg: any) => {
    const newSlug = `${pkg.slug}-copy-${Date.now()}`;
    const { id, created_at, updated_at, slug, ...rest } = pkg;
    
    // Remove the joined category data before insert
    delete rest.package_categories;
    
    const { error } = await supabase.from('packages').insert({
      ...rest,
      slug: newSlug,
      title: `${pkg.title} (Copy)`,
      status: 'draft',
      is_template: false,
    });
    
    if (!error) {
      fetchPackages();
    } else {
      alert("Failed to duplicate package");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Tour Packages Catalog
          </h1>
          <p className="text-xs text-stone-500">
            Publish and manage Hajj, Umrah, and Ziyarat packages.
          </p>
        </div>
        <Link
          href="/admin/packages/new"
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-850 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Package</span>
        </Link>
      </div>

      {/* Packages Directory Grid */}
      {loading ? (
        <div className="h-32 flex items-center justify-center text-sm text-stone-500">Loading packages...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="p-5 bg-white dark:bg-stone-950 border border-stone-200/60 dark:border-stone-850 rounded-2xl shadow-sm flex flex-col justify-between space-y-4 relative group"
            >
              {/* Context Menu Overlay (Hover) */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 bg-white/80 dark:bg-stone-950/80 backdrop-blur-sm rounded-lg p-1 shadow-sm border border-stone-100 dark:border-stone-800">
                <Link 
                  href={`/admin/packages/${pkg.slug}`}
                  className="p-1.5 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors rounded hover:bg-stone-100 dark:hover:bg-stone-800"
                  title="Edit"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </Link>
                <button 
                  onClick={() => handleDuplicate(pkg)}
                  className="p-1.5 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors rounded hover:bg-stone-100 dark:hover:bg-stone-800"
                  title="Duplicate as Draft"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between pr-16">
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-50 dark:bg-stone-900 text-stone-500">
                    {pkg.package_categories?.name || "Uncategorized"}
                  </span>
                  
                  {pkg.status === 'published' ? (
                    <span className="flex items-center space-x-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="h-3 w-3" />
                      <span>Published</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1 text-[10px] text-amber-600 font-semibold bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-full">
                      <Clock className="h-3 w-3" />
                      <span>Draft</span>
                    </span>
                  )}
                </div>
                
                <h3 className="text-sm font-bold text-stone-850 dark:text-stone-200">
                  {pkg.title}
                  {pkg.is_template && (
                    <span className="ml-2 text-[9px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded uppercase tracking-wider">Template</span>
                  )}
                </h3>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-900 text-[10px] text-stone-400">
                <span className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{pkg.duration}</span>
                </span>
                <span className="font-semibold text-stone-500">
                  Availability: {pkg.availability}
                </span>
              </div>
            </div>
          ))}
          
          {packages.length === 0 && !loading && (
             <div className="col-span-full h-32 flex items-center justify-center text-sm text-stone-500 border border-dashed rounded-2xl">
               No packages found. Click "New Package" to get started.
             </div>
          )}
        </div>
      )}
    </div>
  );
}
