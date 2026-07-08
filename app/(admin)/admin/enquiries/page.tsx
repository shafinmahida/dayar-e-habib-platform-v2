"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Inbox, CheckCircle, XCircle, Trash2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminEnquiriesPage() {
  const supabase = createClient();
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setEnquiries(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    await supabase.from('enquiries').update({ status: newStatus }).eq('id', id);
    fetchEnquiries();
  };

  const deleteEnquiry = async (id: string) => {
    if (confirm("Are you sure you want to permanently delete this enquiry?")) {
      await supabase.from('enquiries').delete().eq('id', id);
      fetchEnquiries();
    }
  };

  if (loading) return <div className="p-8 text-muted-foreground animate-pulse">Loading enquiries...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Lead Inbox</h1>
          <p className="text-muted-foreground">Manage and track customer enquiries directly from the website.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        {enquiries.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground flex flex-col items-center">
            <Inbox className="size-12 mb-4 opacity-20" />
            <p>No enquiries found.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {enquiries.map((enq) => (
              <div key={enq.id} className={`p-6 transition-colors ${enq.status === 'new' ? 'bg-accent/5' : ''}`}>
                <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                  
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-lg">{enq.name}</h3>
                      {enq.status === 'new' && <span className="bg-accent text-accent-foreground text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">New</span>}
                      {enq.status === 'contacted' && <span className="bg-green-500/10 text-green-500 border border-green-500/20 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Contacted</span>}
                      {enq.status === 'spam' && <span className="bg-destructive/10 text-destructive border border-destructive/20 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Spam</span>}
                    </div>
                    
                    <div className="text-sm text-muted-foreground flex items-center gap-4">
                      <span>{enq.phone}</span>
                      {enq.email && <span>&bull; {enq.email}</span>}
                    </div>
                    
                    {enq.package_title && (
                      <div className="text-xs font-semibold text-accent mt-2">
                        Interested in: {enq.package_title}
                      </div>
                    )}
                    
                    <div className="mt-4 p-4 bg-secondary/30 rounded-lg text-sm border border-border/50 text-foreground/80 italic">
                      "{enq.message}"
                    </div>
                    
                    <div className="text-xs text-muted-foreground/60 pt-2">
                      Received on {new Date(enq.created_at).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:flex-col w-full md:w-auto">
                    {enq.status !== 'contacted' && (
                      <Button variant="outline" size="sm" className="w-full justify-start text-green-500 hover:text-green-600 hover:bg-green-500/10" onClick={() => updateStatus(enq.id, 'contacted')}>
                        <CheckCircle className="size-4 mr-2" /> Mark Contacted
                      </Button>
                    )}
                    {enq.status !== 'spam' && (
                      <Button variant="outline" size="sm" className="w-full justify-start text-destructive hover:bg-destructive/10" onClick={() => updateStatus(enq.id, 'spam')}>
                        <ShieldAlert className="size-4 mr-2" /> Mark Spam
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground hover:text-destructive" onClick={() => deleteEnquiry(enq.id)}>
                      <Trash2 className="size-4 mr-2" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
