"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  SparklesIcon, BoltIcon, XMarkIcon, LockClosedIcon,
  GlobeAltIcon, QrCodeIcon, ChartBarIcon,
  ChatBubbleBottomCenterTextIcon, MegaphoneIcon,
} from "@heroicons/react/24/outline";

const GHOST_FEATURES = [
  { icon: GlobeAltIcon,                       label: "Custom Domain" },
  { icon: ChatBubbleBottomCenterTextIcon,      label: "AI Sales Agent Pro" },
  { icon: QrCodeIcon,                         label: "Custom QR Code" },
  { icon: ChartBarIcon,                       label: "Advanced Analytics" },
  { icon: MegaphoneIcon,                      label: "Marketing Templates" },
];

export function VibePropWidget() {
  const params = useParams();
  const storeId = params?.storeId as string;
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Pop-up panel */}
      {open && (
        <div className="w-72 bg-gradient-to-br from-indigo-700 via-violet-700 to-purple-800 rounded-2xl shadow-2xl shadow-indigo-900/50 border border-white/10 overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <div className="flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 text-indigo-200" />
              <span className="font-black text-white text-base">Vibe Pro</span>
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Soon</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>

          <p className="text-indigo-200 text-xs px-5 pb-3 leading-relaxed">
            Fitur premium untuk toko yang serius membangun brand mandiri.
          </p>

          {/* Ghost feature list */}
          <div className="px-3 pb-3 space-y-1">
            {GHOST_FEATURES.map((f) => (
              <Link
                key={f.label}
                href={`/dashboard/${storeId}/upgrade`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors group"
              >
                <div className="w-7 h-7 bg-white/10 group-hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors flex-shrink-0">
                  <f.icon className="w-4 h-4 text-indigo-200" />
                </div>
                <span className="text-white text-sm font-medium flex-1">{f.label}</span>
                <LockClosedIcon className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="px-4 pb-5">
            <Link
              href={`/dashboard/${storeId}/upgrade`}
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 bg-white text-indigo-700 font-bold text-sm rounded-xl hover:bg-indigo-50 transition-colors shadow-md"
            >
              <BoltIcon className="w-4 h-4" />
              Daftar Waiting List
            </Link>
          </div>
        </div>
      )}

      {/* FAB trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-xl font-bold text-sm transition-all duration-200 ${
          open
            ? "bg-white text-indigo-700 shadow-indigo-200"
            : "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:scale-105"
        }`}
      >
        {open ? (
          <XMarkIcon className="w-4 h-4" />
        ) : (
          <SparklesIcon className="w-4 h-4" />
        )}
        {open ? "Tutup" : "Vibe Pro"}
      </button>
    </div>
  );
}
