"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { LinkIcon, ArrowDownTrayIcon, ShareIcon } from "@heroicons/react/24/outline";

export function QRGenerator({ storeLink }: { storeLink: string }) {
    const [qrColor, setQrColor] = useState("#4f46e5"); // Indigo-600
    const [bgColor] = useState("#ffffff");
    const [includeLogo, setIncludeLogo] = useState(true);
    
    const downloadQR = () => {
        alert("Mengunduh QR Code resolusi tinggi untuk cetak...");
    };

    const copyLink = () => {
        navigator.clipboard.writeText(storeLink);
        alert("Link tersalin ke clipboard!");
    };

    return (
        <div className="space-y-6 max-w-5xl">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Distribution Tools</h2>
                <p className="text-slate-500 mt-1">Hasilkan Link-in-Bio dan Custom Branded QR untuk toko Anda.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Customization Panel */}
                <div className="space-y-6">
                    {/* Link Section */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Link-in-Bio URL</h3>
                        <div className="flex gap-2">
                            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg flex items-center px-4 font-medium text-slate-700 overflow-hidden truncate">
                                {storeLink}
                            </div>
                            <Button onClick={copyLink} className="bg-slate-900">
                                <LinkIcon className="w-5 h-5 mr-2" /> Copy
                            </Button>
                        </div>
                    </div>

                    {/* QR Code Customizer */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Kustomisasi QR Code (O2O)</h3>
                            <p className="text-sm text-slate-500 mt-1">Sesuaikan QR dengan identitas brand Anda agar lebih profesional saat dicetak.</p>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Tema Warna QR</label>
                                <div className="flex gap-3">
                                    <button onClick={() => setQrColor("#4f46e5")} className={`w-8 h-8 rounded-full bg-indigo-600 border-2 ${qrColor === "#4f46e5" ? "border-slate-900 ring-2 ring-indigo-200" : "border-transparent"}`}></button>
                                    <button onClick={() => setQrColor("#0f172a")} className={`w-8 h-8 rounded-full bg-slate-900 border-2 ${qrColor === "#0f172a" ? "border-slate-500 ring-2 ring-slate-200" : "border-transparent"}`}></button>
                                    <button onClick={() => setQrColor("#10b981")} className={`w-8 h-8 rounded-full bg-emerald-500 border-2 ${qrColor === "#10b981" ? "border-slate-900 ring-2 ring-emerald-200" : "border-transparent"}`}></button>
                                    <button onClick={() => setQrColor("#e11d48")} className={`w-8 h-8 rounded-full bg-rose-600 border-2 ${qrColor === "#e11d48" ? "border-slate-900 ring-2 ring-rose-200" : "border-transparent"}`}></button>
                                </div>
                            </div>
                            
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Sematkan Logo Brand Menengah</label>
                                    <p className="text-xs text-slate-500">Meningkatkan *trust* saat di scan.</p>
                                </div>
                                <div 
                                    className={`w-12 h-6 rounded-full cursor-pointer relative transition-colors ${includeLogo ? 'bg-indigo-600' : 'bg-slate-200'}`}
                                    onClick={() => setIncludeLogo(!includeLogo)}
                                >
                                    <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${includeLogo ? 'translate-x-6' : ''}`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Preview Panel */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center justify-center">
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 mb-8 border border-slate-100 relative">
                        <QRCodeSVG 
                            value={storeLink} 
                            size={200}
                            fgColor={qrColor}
                            bgColor={bgColor}
                            level="Q"
                            imageSettings={includeLogo ? {
                                src: "https://d1icd6shlvmvd6.cloudfront.net/hubble/5903b44b9e2/v2/4458.svg",
                                x: undefined,
                                y: undefined,
                                height: 40,
                                width: 40,
                                excavate: true,
                            } : undefined}
                        />
                        <div className="absolute -top-4 -right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            Live Preview
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                        <Button onClick={downloadQR} className="flex-1 bg-indigo-600 hover:bg-indigo-700 rounded-xl py-6 font-bold text-white">
                            <ArrowDownTrayIcon className="w-5 h-5 mr-2 inline-block" /> Download QR
                        </Button>
                        <Button onClick={copyLink} variant="outline" className="flex-1 rounded-xl py-6 font-bold bg-white border border-slate-200">
                            <ShareIcon className="w-5 h-5 mr-2 inline-block" /> Bagikan Link
                        </Button>
                    </div>
                    <p className="text-xs text-slate-400 mt-4 text-center">Format unduhan SVG/PNG resolusi tinggi (300dpi) siap cetak untuk packaging, stiker, atau standee kasir.</p>
                </div>
            </div>
        </div>
    );
}
