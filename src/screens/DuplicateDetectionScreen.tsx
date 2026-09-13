import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  AlertTriangle,
  FileText,
  Copy,
  CheckCircle,
  Eye,
  ArrowRight,
  ShieldAlert,
  Fingerprint,
  Scale,
  Sparkles
} from 'lucide-react';

export const DuplicateDetectionScreen: React.FC = () => {
  const { setCurrentScreen, quickNavigateToRecord } = useApp();
  const [selectedMatchCase, setSelectedMatchCase] = useState<'89/1' | '142/3'>('89/1');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-900 px-2 py-0.5 rounded">
              Fraud Prevention & Title Integrity
            </span>
            <span className="text-xs text-slate-500">
              Perceptual Hash & Indic Vector Similarity Engine
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 mt-1">
            Potential Duplicate Deed & Re-Conveyance Screening
          </h1>
          <p className="text-xs text-slate-500">
            Detects unauthorized re-sale of identical land parcels, overlapping power-of-attorney documents, and duplicate registration attempts.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSelectedMatchCase('89/1')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedMatchCase === '89/1'
                ? 'bg-purple-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Varanasi Duplicate Case (Khasra 89/1)
          </button>
          <button
            onClick={() => setSelectedMatchCase('142/3')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedMatchCase === '142/3'
                ? 'bg-purple-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Lucknow Case (Khasra 142/3)
          </button>
        </div>
      </div>

      {/* Case 89/1 Deep Duplicate Investigation */}
      {selectedMatchCase === '89/1' && (
        <div className="space-y-6">
          {/* Critical Advisory Banner */}
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 flex items-start gap-4">
            <div className="p-3 bg-purple-600 text-white rounded-xl shadow-xs shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-purple-200 text-purple-900 px-2 py-0.5 rounded">
                  High-Priority Officer Advisory
                </span>
                <span className="font-extrabold text-slate-900 text-sm">
                  Potential Unauthorized Re-Conveyance (Double-Sale Risk)
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                The perceptual hashing engine detected an identical plot description and boundary geometry for <strong>Khasra 89/1 (Mauza Shivpur, Varanasi)</strong> which was already registered 9 months earlier. Under Section 48 of the Transfer of Property Act, earlier conveyance takes precedence.
              </p>
              <div className="text-[11px] text-purple-900 pt-1 font-semibold">
                Statutory Reference for Review: Section 48, Transfer of Property Act, 1882 (Doctrine of Priority) & Section 47, Indian Registration Act, 1908.
              </div>
            </div>
          </div>

          {/* Side-by-Side Comparison of Current vs Archived Prior Deed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Current Submitted Deed */}
            <div className="bg-white rounded-2xl border-2 border-red-300 p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-red-100">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-red-600" />
                  <span className="font-bold text-xs uppercase tracking-wide text-red-900">
                    Current Submitted Deed (Under Review)
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold">
                  Submitted Jan 2026
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Registration Token</span>
                  <span className="font-mono font-bold text-slate-800">DEED/2026/VNS/1082</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Vendor (Seller)</span>
                  <span className="font-semibold text-slate-800">Virendra Pratap Singh s/o Late Brijeshwar</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Vendee (Buyer)</span>
                  <span className="font-semibold text-slate-800">Sunil K. Agrawal & Partners</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Property Description</span>
                  <span className="font-semibold text-slate-800">Khasra 89/1, Area: 0.94 Acres, Mauza Shivpur, Tehsil Pindra</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Consideration Amount</span>
                  <span className="font-mono font-bold text-slate-900">₹ 1,12,00,000 (Stamp: ₹ 7,84,000)</span>
                </div>
              </div>
            </div>

            {/* Right: Archived Prior Registered Deed */}
            <div className="bg-white rounded-2xl border-2 border-slate-300 p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center space-x-2">
                  <Copy className="w-4 h-4 text-purple-700" />
                  <span className="font-bold text-xs uppercase tracking-wide text-purple-900">
                    Prior Registered Deed in Sub-Registrar Archive
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                  Registered Apr 2025
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Registration Deed Number</span>
                  <span className="font-mono font-bold text-slate-800">DEED/2025/VNS/4981 (Jild 892, Page 41)</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Vendor (Seller)</span>
                  <span className="font-semibold text-slate-800">Virendra Pratap Singh s/o Late Brijeshwar</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Vendee (Prior Buyer)</span>
                  <span className="font-semibold text-purple-900 font-bold">M/s Kashi Infrahomes Pvt Ltd</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Property Description</span>
                  <span className="font-semibold text-slate-800">Khasra 89/1, Area: 0.94 Acres, Mauza Shivpur, Tehsil Pindra</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Prior Consideration</span>
                  <span className="font-mono font-bold text-slate-900">₹ 98,00,000 (Mutation Pending in Tehsil)</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Match Metrics Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Similarity & Perceptual Hash Alignment
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-purple-900 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                Vector Distance: 0.04 (Extreme Match)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Parcel Concordance</div>
                <div className="text-xl font-black text-red-600 mt-1">100%</div>
                <p className="text-[10px] text-slate-500 mt-1">Exact Khasra & Chauhaddi overlap</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Vendor Identity Match</div>
                <div className="text-xl font-black text-slate-900 mt-1">99.8%</div>
                <p className="text-[10px] text-slate-500 mt-1">Same seller Aadhar & PAN hash</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Time Lapse</div>
                <div className="text-xl font-black text-amber-600 mt-1">9 Months</div>
                <p className="text-[10px] text-slate-500 mt-1">Prior deed still valid on record</p>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                Recommended Action: <strong>Hold registration & summon prior purchaser under Section 48 Transfer of Property Act.</strong>
              </span>

              <button
                onClick={() => {
                  quickNavigateToRecord('89/1');
                  setCurrentScreen('DOC_VERIFICATION');
                }}
                className="bg-purple-900 hover:bg-purple-800 text-white font-semibold text-xs px-4 py-2 rounded-lg transition inline-flex items-center gap-1.5"
              >
                <span>Inspect Deed Bounding Boxes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Case 142/3 (No duplicate deed, but boundary overlap) */}
      {selectedMatchCase === '142/3' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs text-center py-10">
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            No Duplicate Sale Deeds Found for Khasra 142/3
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Perceptual hashing across the Lucknow Sub-Registrar repository found no other registered conveyances for Khasra 142/3 in the last 15 years.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                quickNavigateToRecord('142/3');
                setCurrentScreen('CROSS_VERIFICATION');
              }}
              className="inline-flex items-center space-x-1.5 bg-blue-900 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
            >
              <span>Back to Khasra 142/3 Risk Advisory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

