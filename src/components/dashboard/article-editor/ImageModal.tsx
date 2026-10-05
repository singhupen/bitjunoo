"use client";

import React, { useState } from "react";
import {
  X,
  Upload,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Maximize2,
  Check,
  Sparkles,
} from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertImage: (imageMarkup: string) => void;
}

export type ImageAlignment = "left" | "center" | "right" | "full";
export type ImageSizePreset = "25%" | "50%" | "75%" | "100%" | "custom";

const PRESET_UNSPLASH_TECH = [
  {
    name: "Distributed Server Cluster",
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "High-Performance Code",
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Network Architecture",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Microchips & Hardware",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function ImageModal({
  isOpen,
  onClose,
  onInsertImage,
}: ImageModalProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "url" | "presets">("upload");
  const [imageUrl, setImageUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [alignment, setAlignment] = useState<ImageAlignment>("center");
  const [sizePreset, setSizePreset] = useState<ImageSizePreset>("75%");
  const [customWidth, setCustomWidth] = useState(75);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  // Process File Upload (local file -> Data URL with optional API upload)
  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (PNG, JPG, WEBP, SVG, GIF).");
      return;
    }
    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setImageUrl(dataUrl);
      if (!altText) setAltText(file.name.replace(/\.[^/.]+$/, ""));
      setIsUploading(false);
    };
    reader.onerror = () => {
      alert("Failed to read image file.");
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const getWidthCss = () => {
    if (sizePreset === "custom") return `${customWidth}%`;
    return sizePreset;
  };

  const handleInsert = () => {
    if (!imageUrl.trim()) {
      alert("Please upload or enter an image URL.");
      return;
    }

    const widthStyle = getWidthCss();
    const cleanAlt = (altText || "Article image").replace(/"/g, '&quot;');
    const cleanCaption = caption.replace(/"/g, '&quot;');

    // Alignment CSS classes and container styles
    let containerClass = "my-6 clear-both";
    let alignStyle = "margin: 1.5rem auto; text-align: center;";

    if (alignment === "left") {
      containerClass = "my-4 md:float-left md:mr-6 mb-4 clear-none max-w-full";
      alignStyle = "text-align: left;";
    } else if (alignment === "right") {
      containerClass = "my-4 md:float-right md:ml-6 mb-4 clear-none max-w-full";
      alignStyle = "text-align: right;";
    } else if (alignment === "full") {
      containerClass = "my-8 clear-both w-full";
      alignStyle = "width: 100%; text-align: center;";
    }

    // HTML Figure markup that accurately supports alignment, resizing, and responsive captions
    const figureHtml = `
<figure class="article-image align-${alignment} ${containerClass}" style="max-width: ${widthStyle}; ${alignStyle}">
  <img src="${imageUrl}" alt="${cleanAlt}" class="rounded-2xl shadow-md border border-slate-200/90 w-full h-auto object-cover" />
  ${cleanCaption ? `<figcaption class="text-xs text-slate-500 mt-2 italic text-center font-medium">${cleanCaption}</figcaption>` : ""}
</figure>
`.trim();

    onInsertImage(`\n${figureHtml}\n`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-royal-blue/10 text-royal-blue">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900">
                Insert & Configure Media
              </h3>
              <p className="text-xs text-slate-500">
                Upload image, configure position alignment, and customize dimensions.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Source Tabs */}
          <div className="flex p-1 rounded-xl bg-slate-100 border border-slate-200/80 gap-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("upload")}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "upload"
                  ? "bg-white text-royal-blue shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Local File</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("url")}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "url"
                  ? "bg-white text-royal-blue shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Web Image URL</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("presets")}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "presets"
                  ? "bg-white text-royal-blue shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tech Presets</span>
            </button>
          </div>

          {/* Tab 1: Upload */}
          {activeTab === "upload" && (
            <div>
              <label
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                  dragActive
                    ? "border-royal-blue bg-royal-blue/5"
                    : "border-slate-300 hover:border-royal-blue/60 bg-slate-50/50 hover:bg-slate-50"
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-royal-blue/10 flex items-center justify-center text-royal-blue mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-800 text-center">
                  Drag and drop image here, or{" "}
                  <span className="text-royal-blue underline">browse files</span>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Supports PNG, JPG, WebP, SVG (up to 10MB)
                </p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
              </label>
              {isUploading && (
                <p className="text-xs text-royal-blue mt-2 font-medium animate-pulse text-center">
                  Processing and loading image preview...
                </p>
              )}
            </div>
          )}

          {/* Tab 2: URL */}
          {activeTab === "url" && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Direct Image Link (HTTPS)
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... or https://..."
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-900"
                />
              </div>
            </div>
          )}

          {/* Tab 3: Presets */}
          {activeTab === "presets" && (
            <div className="grid grid-cols-2 gap-3">
              {PRESET_UNSPLASH_TECH.map((preset) => (
                <div
                  key={preset.name}
                  onClick={() => {
                    setImageUrl(preset.url);
                    setAltText(preset.name);
                    setCaption(preset.name);
                  }}
                  className={`group relative rounded-xl overflow-hidden border p-2 cursor-pointer transition-all flex flex-col gap-2 ${
                    imageUrl === preset.url
                      ? "border-royal-blue ring-2 ring-royal-blue/20 bg-royal-blue/5"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <span className="text-[11px] font-semibold text-slate-800 truncate">
                    {preset.name}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Image Alignment Settings */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-700">
              Layout Alignment & Position
            </h4>
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setAlignment("left")}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  alignment === "left"
                    ? "bg-royal-blue text-white border-royal-blue shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <AlignLeft className="w-4 h-4" />
                <span>Left Wrap</span>
              </button>

              <button
                type="button"
                onClick={() => setAlignment("center")}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  alignment === "center"
                    ? "bg-royal-blue text-white border-royal-blue shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <AlignCenter className="w-4 h-4" />
                <span>Center</span>
              </button>

              <button
                type="button"
                onClick={() => setAlignment("right")}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  alignment === "right"
                    ? "bg-royal-blue text-white border-royal-blue shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <AlignRight className="w-4 h-4" />
                <span>Right Wrap</span>
              </button>

              <button
                type="button"
                onClick={() => setAlignment("full")}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  alignment === "full"
                    ? "bg-royal-blue text-white border-royal-blue shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <Maximize2 className="w-4 h-4" />
                <span>Full Width</span>
              </button>
            </div>
          </div>

          {/* Resizing / Dimensions Settings */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-700">
                Image Size / Resizing
              </h4>
              <span className="text-xs font-mono font-bold text-royal-blue">
                {getWidthCss()}
              </span>
            </div>

            {/* Presets */}
            <div className="grid grid-cols-4 gap-2">
              {(["25%", "50%", "75%", "100%"] as ImageSizePreset[]).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setSizePreset(preset);
                    setCustomWidth(parseInt(preset));
                  }}
                  className={`py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                    sizePreset === preset
                      ? "bg-royal-blue text-white border-royal-blue shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {preset === "25%"
                    ? "Small"
                    : preset === "50%"
                    ? "Medium"
                    : preset === "75%"
                    ? "Large"
                    : "Original"}
                </button>
              ))}
            </div>

            {/* Custom slider */}
            <div className="pt-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Fine-tune Width (% of article width)
              </label>
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={customWidth}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCustomWidth(val);
                  setSizePreset("custom");
                }}
                className="w-full accent-royal-blue cursor-pointer"
              />
            </div>
          </div>

          {/* Image Alt & Caption */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Alt Text (Accessibility & SEO)
              </label>
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="e.g. Distributed consensus diagram"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Caption Note (Optional)
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Figure 1: Raft consensus benchmark"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 text-slate-800"
              />
            </div>
          </div>

          {/* Live Preview of Configured Image */}
          {imageUrl && (
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Render Preview
              </span>
              <div
                className={`overflow-hidden ${
                  alignment === "left"
                    ? "text-left"
                    : alignment === "right"
                    ? "text-right"
                    : "text-center"
                }`}
              >
                <div
                  className="inline-block transition-all duration-200"
                  style={{ width: getWidthCss() }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt={altText || "Preview"}
                    className="rounded-xl shadow border border-slate-200 w-full object-cover max-h-56"
                  />
                  {caption && (
                    <p className="text-[11px] text-slate-500 mt-1.5 italic text-center">
                      {caption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 flex items-center justify-end gap-3 bg-slate-50/70">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!imageUrl.trim()}
            onClick={handleInsert}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-royal-blue via-brand-azure to-brand-cyan text-white font-bold text-xs shadow-md shadow-royal-blue/20 hover:shadow-lg hover:shadow-royal-blue/35 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check className="w-4 h-4" />
            <span>Insert Image</span>
          </button>
        </div>
      </div>
    </div>
  );
}
