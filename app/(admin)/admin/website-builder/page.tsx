"use client";

import { useState } from "react";
import { Layout, FileText, ChevronRight, Image as ImageIcon, Box, Sliders, Type, Hash, Maximize2, Monitor, Smartphone, RotateCcw } from "lucide-react";

type Viewport = "desktop" | "mobile";

export default function WebsiteBuilderPage() {
  const [selectedPage, setSelectedPage] = useState("home");
  const [selectedSection, setSelectedSection] = useState<string | null>("hero");
  const [viewport, setViewport] = useState<Viewport>("desktop");

  const pages = [
    {
      id: "home",
      name: "Homepage Index",
      sections: [
        { id: "hero", name: "Hero Slide", icon: Layout },
        { id: "timeline", name: "Pilgrimage Chronicle", icon: Hash },
        { id: "packages", name: "Curated Packages", icon: Box },
        { id: "gallery", name: "Media Gallery", icon: ImageIcon },
        { id: "testimonials", name: "Testimonials", icon: Type }
      ]
    },
    {
      id: "about",
      name: "About Heritage",
      sections: [
        { id: "story", name: "Brand History", icon: FileText },
        { id: "values", name: "Core Values", icon: Layout }
      ]
    }
  ];

  const activePage = pages.find(p => p.id === selectedPage);
  const activeSectionName = activePage?.sections.find(s => s.id === selectedSection)?.name || "Hero Slide";

  return (
    <div className="-m-6 lg:-m-8 h-[calc(100vh-73px)] flex flex-col overflow-hidden bg-background text-foreground animate-in fade-in duration-300">
      
      {/* Top Toolbar */}
      <div className="h-14 border-b border-border bg-card flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Workspace</span>
          <div className="h-4 w-px bg-border"></div>
          <div className="flex items-center space-x-2 text-sm font-semibold">
            <span className="text-foreground">{activePage?.name}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-primary">{activeSectionName}</span>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1 bg-muted/40 p-1 rounded-lg border border-border">
            <button
              onClick={() => setViewport("desktop")}
              className={`p-1.5 rounded-md transition-colors ${viewport === "desktop" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Monitor className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewport("mobile")}
              className={`p-1.5 rounded-md transition-colors ${viewport === "mobile" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Smartphone className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Discard Changes</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-foreground text-background text-xs font-extrabold tracking-wide rounded-lg hover:opacity-90 transition-opacity shadow-sm">
              <Maximize2 className="h-3.5 w-3.5" />
              <span>Publish Site</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3-Pane Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANE: Hierarchy Navigator */}
        <div className="w-64 border-r border-border bg-card flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-border/50">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Navigator</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-4 no-scrollbar">
            {pages.map((page) => (
              <div key={page.id} className="space-y-1">
                <button
                  onClick={() => { setSelectedPage(page.id); setSelectedSection(page.sections[0]?.id || null); }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-lg transition-colors ${
                    selectedPage === page.id ? "text-foreground bg-muted/50" : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                  }`}
                >
                  <span>{page.name}</span>
                </button>
                
                {selectedPage === page.id && (
                  <div className="pl-4 space-y-0.5 border-l border-border/50 ml-3 mt-1">
                    {page.sections.map((section) => {
                      const Icon = section.icon;
                      const isSelected = selectedSection === section.id;
                      return (
                        <button
                          key={section.id}
                          onClick={() => setSelectedSection(section.id)}
                          className={`w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                            isSelected ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          <span>{section.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CENTER PANE: Canvas/Live Preview */}
        <div className="flex-1 bg-[#EBEBEB] dark:bg-[#050505] overflow-y-auto p-8 flex justify-center custom-scrollbar shadow-inner relative">
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Live Sync Enabled</span>
          </div>

          <div 
            className={`bg-white dark:bg-[#0E0F11] border border-stone-200 dark:border-stone-800 shadow-2xl rounded-xl overflow-hidden transition-all duration-500 ease-in-out ${
              viewport === "desktop" ? "w-full max-w-5xl" : "w-[375px]"
            }`}
          >
            {/* Wireframe Placeholder for Live Editing Preview */}
            <div className="h-full min-h-[600px] flex flex-col relative opacity-80 group">
              <div className="h-16 border-b border-stone-100 dark:border-stone-800/50 flex items-center px-8 justify-between">
                <div className="h-6 w-24 bg-stone-200 dark:bg-stone-800 rounded"></div>
                <div className="flex space-x-4">
                  <div className="h-4 w-12 bg-stone-100 dark:bg-stone-900 rounded"></div>
                  <div className="h-4 w-12 bg-stone-100 dark:bg-stone-900 rounded"></div>
                </div>
              </div>
              <div className="flex-1 bg-stone-50 dark:bg-[#121214] flex flex-col items-center justify-center space-y-6 relative overflow-hidden p-8 text-center">
                
                {/* Active editing boundary overlay indicator */}
                <div className="absolute inset-4 border-2 border-primary/40 border-dashed rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute -top-3 left-4 bg-primary text-primary-foreground text-[9px] font-bold px-2 py-0.5 rounded tracking-widest uppercase">
                    Editing: {activeSectionName}
                  </div>
                </div>

                <div className="h-12 w-3/4 max-w-lg bg-stone-200 dark:bg-stone-800 rounded-lg"></div>
                <div className="h-4 w-1/2 max-w-md bg-stone-200 dark:bg-stone-800 rounded-md"></div>
                <div className="h-4 w-2/5 max-w-sm bg-stone-200 dark:bg-stone-800 rounded-md"></div>
                <div className="h-10 w-32 bg-stone-300 dark:bg-stone-700 rounded-lg mt-4"></div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANE: Properties Inspector */}
        <div className="w-80 border-l border-border bg-card flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-border/50 flex items-center justify-between">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Properties</h3>
            <Sliders className="h-4 w-4 text-muted-foreground" />
          </div>
          
          <div className="flex-1 overflow-y-auto p-5 space-y-8 no-scrollbar">
            {/* Contextual Properties Mock */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-foreground border-b border-border/50 pb-2">Layout Settings</h4>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Section Padding</label>
                  <select className="w-full bg-muted/30 border border-border rounded-md px-3 py-2 text-xs font-semibold text-foreground focus:outline-none focus:border-primary transition-colors">
                    <option>Large (120px)</option>
                    <option>Medium (80px)</option>
                    <option>Small (40px)</option>
                    <option>None (0px)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Background Color</label>
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded border border-border bg-[#FDFBF7]"></div>
                    <input type="text" value="#FDFBF7" readOnly className="flex-1 bg-muted/30 border border-border rounded-md px-3 py-1.5 text-xs font-semibold text-foreground focus:outline-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-foreground border-b border-border/50 pb-2">Content</h4>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Primary Heading</label>
                  <textarea rows={2} defaultValue="Premium Heritage Hajj & Umrah" className="w-full bg-muted/30 border border-border rounded-md px-3 py-2 text-xs font-semibold text-foreground focus:outline-none focus:border-primary transition-colors resize-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Description Text</label>
                  <textarea rows={4} defaultValue="Curated Islamic travel experiences from first principles." className="w-full bg-muted/30 border border-border rounded-md px-3 py-2 text-xs font-semibold text-foreground focus:outline-none focus:border-primary transition-colors resize-none" />
                </div>
              </div>
            </div>

            <div className="space-y-4 opacity-50 pointer-events-none">
              <h4 className="text-xs font-extrabold text-foreground border-b border-border/50 pb-2">Advanced Schema</h4>
              <div className="p-3 bg-muted/30 border border-border rounded-md text-center">
                <span className="text-[10px] font-bold text-muted-foreground">Data binding locked in Sprint 2.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
