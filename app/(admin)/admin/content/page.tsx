"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Globe, Users, MessageSquare, Quote, FileText, Search, Plus, Loader2, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

type Tab = 'testimonials' | 'faqs' | 'representatives' | 'content_blocks';

export default function AdminContentHubPage() {
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState<Tab>('faqs');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    const { data: result, error } = await supabase
      .from(activeTab)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (result) {
      setData(result);
    } else {
      setData([]);
    }
    setLoading(false);
  };

  const deleteItem = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      await supabase.from(activeTab).delete().eq('id', id);
      fetchData();
    }
  };

  const filteredData = data.filter((item) => {
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    switch (activeTab) {
      case 'faqs': return item.question?.toLowerCase().includes(s) || item.answer?.toLowerCase().includes(s);
      case 'testimonials': return item.name?.toLowerCase().includes(s) || item.content?.toLowerCase().includes(s);
      case 'representatives': return item.name?.toLowerCase().includes(s) || item.role?.toLowerCase().includes(s);
      case 'content_blocks': return item.title?.toLowerCase().includes(s) || item.slug?.toLowerCase().includes(s);
      default: return true;
    }
  });

  const renderTabIcon = (tab: Tab) => {
    switch (tab) {
      case 'faqs': return <MessageSquare className="size-4" />;
      case 'testimonials': return <Quote className="size-4" />;
      case 'representatives': return <Users className="size-4" />;
      case 'content_blocks': return <FileText className="size-4" />;
    }
  };

  const renderTabLabel = (tab: Tab) => {
    switch (tab) {
      case 'faqs': return 'FAQs';
      case 'testimonials': return 'Testimonials';
      case 'representatives': return 'Representatives';
      case 'content_blocks': return 'Reusable Blocks';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 h-[calc(100vh-2rem)] flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Globe className="size-8 text-accent" />
            Global Content Hub
          </h1>
          <p className="text-muted-foreground">Manage reusable entities like FAQs, Testimonials, and Staff.</p>
        </div>
        <Button className="shrink-0">
          <Plus className="size-4 mr-2" /> Add {renderTabLabel(activeTab).replace(/s$/, '')}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
        {/* Left Nav */}
        <div className="w-full lg:w-64 space-y-2 shrink-0">
          {(['faqs', 'testimonials', 'representatives', 'content_blocks'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${
                activeTab === tab 
                  ? 'bg-foreground text-background shadow-md' 
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              }`}
            >
              {renderTabIcon(tab)}
              {renderTabLabel(tab)}
            </button>
          ))}
        </div>

        {/* Right Content */}
        <div className="flex-1 bg-card border border-border rounded-xl shadow-sm flex flex-col min-h-0 overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/20 flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder={`Search ${renderTabLabel(activeTab).toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="text-xs text-muted-foreground ml-auto">
              {filteredData.length} items
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-0">
            {loading ? (
              <div className="flex items-center justify-center h-full text-muted-foreground animate-pulse gap-2">
                <Loader2 className="size-5 animate-spin" /> Loading data...
              </div>
            ) : filteredData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-12">
                <Globe className="size-12 opacity-20 mb-4" />
                <p>No items found.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredData.map((item) => (
                  <div key={item.id} className="p-4 hover:bg-muted/30 transition-colors flex items-center justify-between group">
                    <div className="space-y-1 flex-1 pr-4">
                      {activeTab === 'faqs' && (
                        <>
                          <h4 className="font-bold text-foreground">{item.question}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-1">{item.answer}</p>
                        </>
                      )}
                      {activeTab === 'testimonials' && (
                        <>
                          <h4 className="font-bold text-foreground">{item.name} <span className="text-xs font-normal text-muted-foreground">({item.location})</span></h4>
                          <p className="text-sm text-muted-foreground line-clamp-1 italic">"{item.content}"</p>
                        </>
                      )}
                      {activeTab === 'representatives' && (
                        <>
                          <h4 className="font-bold text-foreground">{item.name}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-1">{item.role}</p>
                        </>
                      )}
                      {activeTab === 'content_blocks' && (
                        <>
                          <h4 className="font-bold text-foreground">{item.title}</h4>
                          <p className="text-sm font-mono text-muted-foreground line-clamp-1">Slug: {item.slug}</p>
                        </>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-green-500/10 text-green-500 border border-green-500/20 mr-2">
                        {item.active !== false ? 'Active' : 'Inactive'}
                      </div>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Edit className="size-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => deleteItem(item.id)}>
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
