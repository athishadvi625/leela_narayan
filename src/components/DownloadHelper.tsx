import React, { useState } from 'react';
import { Download, FileCode, Archive, Check, Sparkles, X, HardDrive } from 'lucide-react';

export const DownloadHelper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [downloadingHtml, setDownloadingHtml] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const downloadFile = async (url: string, filename: string, setProgress: (b: boolean) => void) => {
    try {
      setProgress(true);
      const res = await fetch(url, { credentials: 'include' });
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);

      setDownloadSuccess(filename);
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch {
      window.location.href = url;
    } finally {
      setProgress(false);
    }
  };

  return (
    <>
      {/* Floating Save / Export Badge */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#3B0D11] hover:bg-[#54141A] text-white shadow-xl hover:shadow-2xl border border-[#EAC665]/40 transition-all cursor-pointer group"
          title="Save Website to H:\leela narayan"
        >
          <HardDrive className="w-4 h-4 text-[#EAC665] group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold tracking-wider uppercase">
            Save to H:\ Drive
          </span>
        </button>
      </div>

      {/* Export / Download Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative border border-[#E8E0D2] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-800 p-2 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8E6E1A]">
                <Sparkles className="w-4 h-4" />
                <span>Local Drive Exporter</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#3B0D11]">
                Save to H:\leela narayan
              </h3>
              <p className="text-xs text-stone-500">
                Choose the simplest option below to put the website into your folder:
              </p>
            </div>

            {downloadSuccess && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Downloaded {downloadSuccess}! Move it into H:\leela narayan.</span>
              </div>
            )}

            {/* Option 1: Recommended Single-File HTML */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E0D2] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-[#3B0D11]">
                  <FileCode className="w-5 h-5 text-[#8E6E1A]" />
                  <span>Option 1: Single-File Website (index.html)</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Recommended · No Unzipping
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Contains the entire website with all 5 high-res photos already embedded inside. No extraction wizard needed—just save it into <code className="bg-stone-200 px-1 py-0.5 rounded text-stone-800 font-mono">H:\leela narayan\index.html</code> and double-click it!
              </p>
              <button
                type="button"
                onClick={() => downloadFile('/leela-narayan-all-in-one.html', 'index.html', setDownloadingHtml)}
                disabled={downloadingHtml}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold tracking-wider uppercase text-white bg-[#3B0D11] hover:bg-[#54141A] transition-all cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4 text-[#EAC665]" />
                <span>{downloadingHtml ? 'Generating Download...' : 'Download index.html (Single File)'}</span>
              </button>
            </div>

            {/* Option 2: Full ZIP Package */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8E0D2] space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#3B0D11]">
                <Archive className="w-5 h-5 text-[#8E6E1A]" />
                <span>Option 2: Complete ZIP Archive</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Contains <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-800 font-mono">index.html</code> and the separate <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-800 font-mono">images/</code> folder (1.04 MB).
              </p>
              <button
                type="button"
                onClick={() => downloadFile('/leela-narayan-website.zip', 'leela-narayan-website.zip', setDownloadingZip)}
                disabled={downloadingZip}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold tracking-wider uppercase text-stone-800 hover:text-white bg-stone-100 hover:bg-[#3B0D11] transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{downloadingZip ? 'Downloading ZIP...' : 'Download leela-narayan-website.zip'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
