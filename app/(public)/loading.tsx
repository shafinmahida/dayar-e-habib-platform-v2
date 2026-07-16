export default function PublicLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative size-10">
          <div className="absolute inset-0 rounded-full border-2 border-muted" />
          <div className="absolute inset-0 rounded-full border-2 border-t-accent animate-spin" />
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground animate-pulse">
          Loading
        </p>
      </div>
    </div>
  );
}
