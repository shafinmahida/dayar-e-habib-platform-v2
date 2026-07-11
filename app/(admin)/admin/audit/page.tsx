"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Activity, Clock, Database, User, FileJson, Search, Filter, ShieldCheck, Users } from "lucide-react";
import { getSystemUsers } from "./actions";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function AdminAuditLogsPage() {
  const supabase = createClient();
  const [logs, setLogs] = useState<any[]>([]);
  const [systemUsers, setSystemUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState<any | null>(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTable, setFilterTable] = useState("all");
  const [filterAction, setFilterAction] = useState("all");

  useEffect(() => {
    fetchData();
    
    // Subscribe to real-time audit logs
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'audit_logs' },
        (payload) => {
          setLogs(current => [payload.new, ...current]);
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch users securely via server action
      const usersData = await getSystemUsers();
      setSystemUsers(usersData);

      // Fetch logs
      const { data: logsData } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (logsData) {
        // Manually join with usersData to fix 'Unknown'
        const enrichedLogs = logsData.map(log => {
          const user = usersData.find(u => u.id === log.user_id);
          return {
            ...log,
            profiles: user ? { full_name: user.full_name, email: user.email } : null
          };
        });
        setLogs(enrichedLogs);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const ActionBadge = ({ action }: { action: string }) => {
    switch (action) {
      case 'INSERT': return <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-wider">Created</span>;
      case 'UPDATE': return <span className="bg-blue-500/10 text-blue-500 border border-blue-500/20 text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-wider">Updated</span>;
      case 'DELETE': return <span className="bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-wider">Deleted</span>;
      default: return <span className="bg-muted text-muted-foreground text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-wider">{action}</span>;
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = JSON.stringify(log).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTable = filterTable === "all" || log.table_name === filterTable;
    const matchesAction = filterAction === "all" || log.action === filterAction;
    return matchesSearch && matchesTable && matchesAction;
  });

  const getStatusColor = (lastSignIn: string | null) => {
    if (!lastSignIn) return "bg-gray-500";
    const minutesAgo = (new Date().getTime() - new Date(lastSignIn).getTime()) / 60000;
    if (minutesAgo < 15) return "bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]";
    if (minutesAgo < 60 * 24) return "bg-blue-500";
    return "bg-gray-500";
  };

  // Visual Diff Engine
  const renderDiff = (oldData: any, newData: any) => {
    const oldKeys = Object.keys(oldData || {});
    const newKeys = Object.keys(newData || {});
    const allKeys = Array.from(new Set([...oldKeys, ...newKeys]));

    if (allKeys.length === 0) {
      return (
        <div className="text-muted-foreground text-xs italic">
          No structured data payload available for this action.
        </div>
      );
    }

    return (
      <div className="space-y-1 font-mono text-xs">
        {allKeys.map(key => {
          const oldVal = JSON.stringify(oldData?.[key]);
          const newVal = JSON.stringify(newData?.[key]);
          
          if (oldVal === newVal) {
            return (
              <div key={key} className="flex opacity-50 px-2 py-1">
                <span className="w-1/3 truncate">{key}:</span>
                <span className="w-2/3 truncate">{oldVal}</span>
              </div>
            );
          }

          return (
            <div key={key} className="flex flex-col rounded overflow-hidden border border-border/20">
              <div className="bg-muted/50 px-2 py-1 font-bold">{key}</div>
              {oldVal !== undefined && (
                <div className="flex bg-red-500/10 text-red-500 px-2 py-1">
                  <span className="w-6 shrink-0">-</span>
                  <span className="break-all">{oldVal}</span>
                </div>
              )}
              {newVal !== undefined && (
                <div className="flex bg-emerald-500/10 text-emerald-500 px-2 py-1">
                  <span className="w-6 shrink-0">+</span>
                  <span className="break-all">{newVal}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <ShieldCheck className="size-8 text-accent" />
            Supreme Audit Center
          </h1>
          <p className="text-muted-foreground mt-1">Real-time surveillance & immutable historical logs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
        
        {/* Column 1: Live Radar & Filters */}
        <div className="lg:col-span-1 flex flex-col gap-6 overflow-hidden">
          {/* Active Users Radar */}
          <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col min-h-[300px]">
            <div className="p-4 border-b border-border bg-muted/20 flex items-center gap-2">
              <Users className="size-5 text-accent" />
              <h3 className="font-bold tracking-tight text-sm uppercase">Live Radar</h3>
            </div>
            <div className="p-4 overflow-y-auto flex-1 space-y-3 custom-scrollbar">
              {systemUsers.map(user => (
                <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className={`size-2.5 rounded-full shrink-0 ${getStatusColor(user.last_sign_in_at)}`} />
                  <div className="flex-1 truncate">
                    <div className="text-sm font-bold truncate">{user.full_name}</div>
                    <div className="text-[10px] text-muted-foreground truncate">{user.email}</div>
                  </div>
                  <div className="text-[10px] text-right text-muted-foreground flex flex-col items-end">
                    {user.last_sign_in_at ? (
                      <>
                        <span className="font-bold text-foreground">{formatDistanceToNow(parseISO(user.last_sign_in_at), { addSuffix: true })}</span>
                        <span>{new Date(user.last_sign_in_at).toLocaleString()}</span>
                      </>
                    ) : (
                      "Never logged in"
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* God-Mode Filters */}
          <div className="bg-card border border-border rounded-xl shadow-sm p-4 space-y-4">
            <h3 className="font-bold tracking-tight text-sm uppercase flex items-center gap-2">
              <Filter className="size-4 text-muted-foreground" /> Filters
            </h3>
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search payloads, IDs..." 
                  className="w-full bg-muted/50 border border-border rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-accent"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select 
                  className="bg-muted/50 border border-border rounded-lg px-2 py-2 text-xs focus:outline-none"
                  value={filterTable}
                  onChange={e => setFilterTable(e.target.value)}
                >
                  <option value="all">All Tables</option>

                  <option value="packages">Packages</option>
                </select>
                <select 
                  className="bg-muted/50 border border-border rounded-lg px-2 py-2 text-xs focus:outline-none"
                  value={filterAction}
                  onChange={e => setFilterAction(e.target.value)}
                >
                  <option value="all">All Actions</option>
                  <option value="INSERT">Creates</option>
                  <option value="UPDATE">Updates</option>
                  <option value="DELETE">Deletes</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Stream */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="size-5 text-accent" />
              <h3 className="font-bold tracking-tight text-sm uppercase">Event Stream</h3>
            </div>
            <div className="text-xs text-muted-foreground font-mono">{filteredLogs.length} events</div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-border">
            {loading ? (
               <div className="p-12 text-center text-muted-foreground animate-pulse font-mono text-sm">Initializing surveillance grid...</div>
            ) : filteredLogs.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground font-mono text-sm">No anomalous activity detected.</div>
            ) : (
              filteredLogs.map((log) => (
                <div 
                  key={log.id} 
                  onClick={() => setSelectedLog(log)}
                  className={`p-4 cursor-pointer hover:bg-accent/5 transition-colors flex items-center justify-between ${selectedLog?.id === log.id ? 'bg-accent/10 border-l-2 border-l-accent' : 'border-l-2 border-l-transparent'}`}
                >
                  <div className="flex items-center gap-4">
                    <Database className={`size-8 p-1.5 rounded ${selectedLog?.id === log.id ? 'bg-accent text-accent-foreground' : 'bg-secondary/50 text-muted-foreground'}`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold font-mono text-sm">{log.table_name}</span>
                        <ActionBadge action={log.action} />
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                        <Clock className="size-3" />
                        {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
                        <User className="size-3 ml-2" />
                        <span className="truncate max-w-[150px]">{log.profiles?.full_name || log.profiles?.email || 'System'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 3: Inspector */}
        <div className="lg:col-span-1 bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/20 flex items-center gap-2">
            <FileJson className="size-5 text-accent" />
            <h3 className="font-bold tracking-tight text-sm uppercase">Deep Inspector</h3>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 bg-[#0D0D0D]">
            {!selectedLog ? (
              <div className="h-full flex items-center justify-center text-muted-foreground text-center text-xs font-mono">
                Select an event from the stream to analyze data payloads.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Target ID</div>
                  <div className="text-accent bg-accent/10 px-2 py-1 rounded text-xs font-mono break-all border border-accent/20">
                    {selectedLog.record_id}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest flex items-center justify-between">
                    <span>Payload Diff</span>
                    <span className="text-emerald-500 bg-emerald-500/10 px-1 rounded">Delta</span>
                  </div>
                  {renderDiff(selectedLog.old_data, selectedLog.new_data)}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
