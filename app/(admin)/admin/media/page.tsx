"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Image as ImageIcon, Video, FileText, Link as LinkIcon, Trash2, Search, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminMediaHubPage() {
  const supabase = createClient();
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [addingVideo, setAddingVideo] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('media_assets')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setAssets(data);
    setLoading(false);
  };

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleAddYoutube = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeUrl) return;

    const videoId = getYoutubeId(youtubeUrl);
    if (!videoId) {
      alert("Invalid YouTube URL");
      return;
    }

    setAddingVideo(true);
    const { data: { user } } = await supabase.auth.getUser();

    // YouTube Thumbnail resolution
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    
    const { error } = await supabase.from('media_assets').insert({
      folder: 'gallery',
      file_name: `youtube_${videoId}`,
      original_name: youtubeUrl,
      mime_type: 'video/youtube',
      media_type: 'video',
      public_url: `https://www.youtube.com/embed/${videoId}`,
      thumbnail_url: thumbnailUrl,
      created_by: user?.id
    });

    if (!error) {
      setYoutubeUrl("");
      fetchMedia();
    } else {
      console.error(error);
      alert("Failed to save video.");
    }
    setAddingVideo(false);
  };

  const deleteAsset = async (id: string) => {
    if (confirm("Are you sure you want to remove this asset?")) {
      await supabase.from('media_assets').delete().eq('id', id);
      fetchMedia();
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Universal Media Hub</h1>
          <p className="text-muted-foreground">Manage all images, videos, and documents across your platform.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Main Gallery Grid */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl shadow-sm overflow-hidden min-h-[500px] flex flex-col">
          <div className="p-4 border-b border-border flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search assets..." 
                className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
          
          <div className="p-4 flex-1">
            {loading ? (
              <div className="h-full flex items-center justify-center text-muted-foreground animate-pulse">Loading gallery...</div>
            ) : assets.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4 py-12">
                <ImageIcon className="size-12 opacity-20" />
                <p>No media assets found in your library.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {assets.map((asset) => (
                  <div key={asset.id} className="group relative aspect-square rounded-lg border border-border bg-muted/30 overflow-hidden shadow-sm">
                    {asset.media_type === 'video' ? (
                      <div className="w-full h-full relative">
                        <img src={asset.thumbnail_url} alt={asset.file_name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Video className="size-8 text-white drop-shadow-md" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                         <ImageIcon className="size-8 opacity-20" />
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold truncate">{asset.file_name}</div>
                        <div className="text-[10px] text-muted-foreground mt-1 uppercase">{asset.media_type}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="icon" variant="destructive" className="h-8 w-8 ml-auto" onClick={() => deleteAsset(asset.id)}>
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Upload & Add Sidebar */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold">
              <LinkIcon className="size-5" />
              <h3>Add YouTube Video</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              To save storage and optimize load times, all videos are hosted via YouTube. Paste a link below to add it to your library.
            </p>
            <form onSubmit={handleAddYoutube} className="space-y-3">
              <input
                type="url"
                required
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
              />
              <Button type="submit" className="w-full" disabled={addingVideo}>
                {addingVideo ? <Loader2 className="size-4 animate-spin mr-2" /> : <Plus className="size-4 mr-2" />}
                Add Video
              </Button>
            </form>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-sm p-6 space-y-4 opacity-50 pointer-events-none">
            <div className="flex items-center gap-2 text-primary font-bold">
              <ImageIcon className="size-5" />
              <h3>Upload Images</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Drag & drop images here to upload directly to Supabase Storage. (Coming Soon)
            </p>
            <div className="border-2 border-dashed border-border rounded-lg h-32 flex items-center justify-center text-muted-foreground bg-muted/20">
              <Plus className="size-6 opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
