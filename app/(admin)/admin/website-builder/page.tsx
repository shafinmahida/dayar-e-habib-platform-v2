"use client";

import { useState } from "react";
import { Layout, Compass, HelpCircle, Phone, ArrowLeft, Sliders, Save, Eye } from "lucide-react";

type EditorStep = "select-page" | "select-section" | "preview-fields";

export default function WebsiteBuilderPage() {
  const [step, setStep] = useState<EditorStep>("select-page");
  const [selectedPage, setSelectedPage] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const pagesList = [
    { id: "home", name: "Homepage Index", icon: Layout, sections: ["Hero Slide", "Estimated Timelines", "Accredited Badges", "Founder Quote", "Testimonials ruletable"] },
    { id: "about", name: "About Heritage Page", icon: Compass, sections: ["Brand History Story", "Values Grid"] },
    { id: "contact", name: "Contact Touchpoint", icon: Phone, sections: ["Office Hours Map Link", "Support Directory Numbers"] },
    { id: "faq", name: "Global FAQs List", icon: HelpCircle, sections: ["Biometric & Documentation items"] }
  ];

  const mockFields: Record<string, Array<{ label: string; value: string; type: "text" | "textarea" | "toggle" }>> = {
    "Hero Slide": [
      { label: "Hero Main Title Text", value: "Dayar-E-Habib Tours & Travels", type: "text" },
      { label: "Hero Subtitle Description", value: "Premium heritage Hajj, Umrah, and curated Islamic travel experiences from first principles.", type: "textarea" },
      { label: "Primary CTA Button Label", value: "View Offerings", type: "text" },
      { label: "Secondary CTA Button Label", value: "Connect with Advisor", type: "text" },
      { label: "Smooth Scroll Animation Enabled", value: "true", type: "toggle" }
    ],
    "Estimated Timelines": [
      { label: "Chronicle Section Title", value: "Pilgrimage Chronicle", type: "text" },
      { label: "Watermark Styling Enabled", value: "true", type: "toggle" }
    ]
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Website Builder Portal
          </h1>
          <p className="text-xs text-stone-500">
            Customize structural sections, copy texts, logos, and layouts.
          </p>
        </div>
        
        {step !== "select-page" && (
          <button
            onClick={() => {
              if (step === "preview-fields") setStep("select-section");
              else setStep("select-page");
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Go Back</span>
          </button>
        )}
      </div>

      {/* STEP 1: Select Page */}
      {step === "select-page" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pagesList.map((page) => {
            const Icon = page.icon;
            return (
              <button
                key={page.id}
                onClick={() => {
                  setSelectedPage(page.name);
                  setStep("select-section");
                }}
                className="flex items-start space-x-4 p-5 bg-white dark:bg-stone-950 border border-stone-200/60 dark:border-stone-850 hover:border-stone-300 dark:hover:border-stone-755 rounded-2xl shadow-sm text-left transition-all duration-150 group"
              >
                <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-xl text-stone-500 group-hover:text-stone-800 dark:group-hover:text-stone-200 transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-stone-800 dark:text-stone-200">
                    {page.name}
                  </h3>
                  <p className="text-xs text-stone-400">
                    {page.sections.length} customizable sections inside page.
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* STEP 2: Select Section */}
      {step === "select-section" && (
        <div className="bg-white dark:bg-stone-950 border border-stone-200/60 dark:border-stone-850 rounded-2xl shadow-sm p-6 space-y-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Page Selected: {selectedPage}
            </span>
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 mt-1">
              Choose a layout section to edit:
            </h3>
          </div>
          <div className="divide-y divide-stone-100 dark:divide-stone-900">
            {pagesList
              .find(p => p.name === selectedPage)
              ?.sections.map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    setSelectedSection(section);
                    setStep("preview-fields");
                  }}
                  className="w-full flex items-center justify-between py-3.5 text-left text-xs font-semibold text-stone-700 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors group"
                >
                  <span>{section}</span>
                  <Sliders className="h-4 w-4 text-stone-400 group-hover:text-stone-655" />
                </button>
              ))}
          </div>
        </div>
      )}

      {/* STEP 3: Preview Editable Fields */}
      {step === "preview-fields" && (
        <div className="bg-white dark:bg-stone-950 border border-stone-200/60 dark:border-stone-850 rounded-2xl shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-900 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                {selectedPage} &gt; {selectedSection}
              </span>
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 mt-1">
                Customizer Workspace
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => alert("Preview rendering requires dynamic backend sync.")}
                className="flex items-center space-x-1.5 px-3 py-1.5 border border-stone-200 hover:bg-stone-50 dark:border-stone-800 text-stone-600 dark:text-stone-400 text-xs font-semibold rounded-lg transition-colors"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Live View</span>
              </button>
              <button
                type="button"
                onClick={() => alert("Sprint 1: Schema saving operates in placeholder mode.")}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-850 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save Section</span>
              </button>
            </div>
          </div>

          <div className="space-y-5">
            {mockFields[selectedSection] ? (
              mockFields[selectedSection].map((field) => (
                <div key={field.label} className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-605">
                    {field.label}
                  </label>
                  {field.type === "text" && (
                    <input
                      type="text"
                      defaultValue={field.value}
                      className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 dark:border-stone-800 dark:bg-stone-900/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-400 text-stone-800 dark:text-stone-200"
                    />
                  )}
                  {field.type === "textarea" && (
                    <textarea
                      defaultValue={field.value}
                      rows={3}
                      className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 dark:border-stone-800 dark:bg-stone-900/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-400 text-stone-800 dark:text-stone-200 leading-relaxed"
                    />
                  )}
                  {field.type === "toggle" && (
                    <div className="flex items-center space-x-3.5">
                      <button
                        type="button"
                        className="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out bg-stone-900 dark:bg-stone-100"
                      >
                        <span className="translate-x-4 pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white dark:bg-stone-950 shadow ring-0 transition duration-200 ease-in-out" />
                      </button>
                      <span className="text-xs text-stone-500">{field.value}</span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-xs text-stone-400">
                Custom fields will be rendered based on the database schema in subsequent sprints.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
