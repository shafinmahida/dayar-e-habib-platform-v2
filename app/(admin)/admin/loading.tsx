export default function AdminLoading() {
  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-muted rounded" />
          <div className="h-4 w-48 bg-muted/60 rounded" />
        </div>
      </div>
      {/* Content skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-card border border-border rounded-xl" />
        ))}
      </div>
      <div className="h-96 bg-card border border-border rounded-xl" />
    </div>
  );
}
