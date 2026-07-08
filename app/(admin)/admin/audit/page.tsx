"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Activity, Clock, Database, User, FileJson, ArrowRight } from "lucide-react";

export default function AdminAuditLogsPage() {
  const supabase = createClient();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState<any | null>(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    // We join with profiles (auth.users extension) to get the user name if available
    const { data } = await supabase
      .from('audit_logs')
      .select(`
        *,
        profiles:user_id (full_name, email)
      `)
      .order('created_at', { ascending: false })
      .limit(100);
    
    if (data) setLogs(data);
    setLoading(false);
  };

  const ActionBadge = ({ action }: { action: string }) => {
    switch (action) {
      case 'INSERT': return <span className="bg-green-500/10 text-green-500 border border-green-500/20 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">Created</span>;
      case 'UPDATE': return <span className="bg-blue-500/10 text-blue-500 border border-blue-500/20 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">Updated</span>;
      case 'DELETE': return <span className="bg-destructive/10 text-destructive border border-destructive/20 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">Deleted</span>;
      default: return <span className="bg-muted text-muted-foreground text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">{action}</span>;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 flex flex-col md:flex-row gap-8">
      {/* Left Column: Log Stream */}
      <div className="flex-1 space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Activity className="size-8 text-accent" />
            Security & Audit Logs
          </h1>
          <p className="text-muted-foreground">Immutable history of all database modifications.</p>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          {loading ? (
             <div className="p-12 text-center text-muted-foreground animate-pulse">Loading system logs...</div>
          ) : logs.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">No logs found.</div>
          ) : (
            <div className="divide-y divide-border">
              {logs.map((log) => (
                <div 
                  key={log.id} 
                  onClick={() => setSelectedLog(log)}
                  className={`p-4 cursor-pointer hover:bg-muted/30 transition-colors flex items-center justify-between ${selectedLog?.id === log.id ? 'bg-muted/50 border-l-2 border-l-accent' : 'border-l-2 border-l-transparent'}`}
                >
                  <div className="flex items-center gap-4">
                    <Database className="size-8 p-1.5 bg-secondary/50 rounded text-muted-foreground" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold font-mono text-sm">{log.table_name}</span>
                        <ActionBadge action={log.action} />
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                        <Clock className="size-3" />
                        {new Date(log.created_at).toLocaleString()}
                        <User className="size-3 ml-2" />
                        {log.profiles?.full_name || log.profiles?.email || 'System / Anonymous'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Log Details Inspector */}
      <div className="w-full md:w-[400px] lg:w-[500px]">
        <div className="sticky top-24 bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col h-[calc(100vh-8rem)]">
          <div className="p-4 border-b border-border bg-muted/20 flex items-center gap-2">
            <FileJson className="size-5 text-muted-foreground" />
            <h3 className="font-bold tracking-tight">Inspector</h3>
          </div>
          
          <div className="p-4 overflow-y-auto flex-1 text-sm font-mono space-y-6">
            {!selectedLog ? (
              <div className="h-full flex items-center justify-center text-muted-foreground text-center">
                Select an event from the stream to view its exact data payload.
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Record ID</div>
                  <div className="text-foreground bg-muted p-2 rounded break-all">{selectedLog.record_id}</div>
                </div>
                
                {selectedLog.old_data && (
                  <div className="space-y-1">
                    <div className="text-xs text-destructive uppercase font-bold tracking-wider">Previous State</div>
                    <pre className="text-[10px] text-foreground bg-destructive/5 border border-destructive/20 p-3 rounded overflow-x-auto">
                      {JSON.stringify(selectedLog.old_data, null, 2)}
                    </pre>
                  </div>
                )}
                
                {selectedLog.new_data && (
                  <div className="space-y-1">
                    <div className="text-xs text-green-500 uppercase font-bold tracking-wider">New State</div>
                    <pre className="text-[10px] text-foreground bg-green-500/5 border border-green-500/20 p-3 rounded overflow-x-auto">
                      {JSON.stringify(selectedLog.new_data, null, 2)}
                    </pre>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
