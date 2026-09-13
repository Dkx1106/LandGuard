import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  Database,
  Scale,
  Landmark,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Building,
  ArrowRight,
  HelpCircle,
  Clock,
  Layers,
  Info
} from 'lucide-react';

export const CrossVerificationScreen: React.FC = () => {
  const { currentRecord, setCurrentScreen, officerPersona } = useApp();

  const isHighRisk = currentRecord.riskScore >= 70;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
              Multi-Registry Reconciliation Engine
            </span>
            <span className="text-xs font-mono text-slate-500">
              Khasra: <strong className="text-blue-900">{currentRecord.khasraNumber}</strong> &bull; {currentRecord.village}, {currentRecord.district}
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 mt-1">
            Pre-Transaction Cross-Verification & Risk Advisory
          </h1>
          <p className="text-xs text-slate-500">
            Real-time reconciliation across State Land Records (Bhulekh), e-Courts Judicial Injunctions, and CERSAI Mortgage Registries.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Composite Risk Score</div>
            <div
              className={`text-2xl font-black ${
                isHighRisk ? 'text-red-700' : 'text-emerald-700'
              }`}
            >
              {currentRecord.riskScore}
              <span className="text-xs font-semibold text-slate-400">/100</span>
            </div>
          </div>
          <div
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase border ${
              isHighRisk
                ? 'bg-red-50 text-red-800 border-red-200'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}
          >
            {isHighRisk ? 'High Caution' : 'Concordant'}
          </div>
        </div>
      </div>

      {/* 4 Multi-Registry Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1: Bhulekh UP RoR vs Deed */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-900">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">1. Bhulekh RoR (Record of Rights) Check</h3>
                <span className="text-[10px] text-slate-500">Official UP Revenue Department Database</span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
              Area Discrepancy
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">OFFICIAL RECORDED AREA</span>
                <span className="font-bold text-slate-800 text-sm font-mono">{currentRecord.areaAcres} Acres</span>
                <span className="text-[10px] text-slate-500 block">(Khatauni 00482)</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">DEED CLAIMED AREA</span>
                <span className="font-bold text-red-700 text-sm font-mono">{currentRecord.claimedAreaAcres} Acres</span>
                <span className="text-[10px] text-red-600 block">(+0.28 Acre Excess Claimed)</span>
              </div>
            </div>

            <div className="text-slate-700 text-[11px] leading-relaxed">
              <strong>Recorded Tenure Holders:</strong> {currentRecord.history.recordedOwners.join(', ')}.
              <br />
              <strong>Observation:</strong> Submitted deed claims sole proprietary conveyance without registered partition or succession order from co-sharer Late Ramcharan.
            </div>

            <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-amber-900 text-[11px]">
              <strong className="text-amber-950">Statutory Reference for Review:</strong> Section 31 & Section 38, UP Revenue Code, 2006 (Correction of Settlement Records & Map Errors).
            </div>
          </div>
        </div>

        {/* Pillar 2: e-Courts Judicial Injunction Check */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-red-50 text-red-700">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">2. e-Courts Judicial Litigations Check</h3>
                <span className="text-[10px] text-slate-500">National Judicial Data Grid (NJDG)</span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-900 border border-red-200">
              Active Stay Notice
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="bg-red-50/70 p-3 rounded-lg border border-red-200 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-red-900 font-mono">{currentRecord.litigation.caseNumber}</span>
                <span className="text-[10px] bg-red-200/80 text-red-900 px-1.5 py-0.5 rounded font-bold">
                  Injunction Bar
                </span>
              </div>
              <div className="text-slate-700 text-[11px] font-medium">
                {currentRecord.litigation.courtName}
              </div>
              <p className="text-[11px] text-red-800 italic pt-1">
                "{currentRecord.litigation.stayDetails}"
              </p>
            </div>

            <div className="text-slate-700 text-[11px] leading-relaxed">
              <strong>Observation:</strong> Title is subject to pending partition suit between co-heirs. Registering alienation may trigger contempt proceedings or doctrine of lis pendens.
            </div>

            <div className="bg-red-50 p-2.5 rounded-lg border border-red-200 text-red-900 text-[11px]">
              <strong className="text-red-950">Statutory Reference for Review:</strong> Section 52, Transfer of Property Act, 1882 & Order 39 Rules 1 & 2 CPC.
            </div>
          </div>
        </div>

        {/* Pillar 3: CERSAI Banking Mortgage Search */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-900">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">3. CERSAI Banking Encumbrance Search</h3>
                <span className="text-[10px] text-slate-500">Central Security Interest Registry of India</span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
              Active Mortgage
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">{currentRecord.encumbrance.bankName}</span>
                <span className="text-[10px] font-mono text-slate-600">{currentRecord.encumbrance.cersaiRef}</span>
              </div>
              <div className="text-slate-800 font-semibold font-mono text-sm">
                Facility Lien: {currentRecord.encumbrance.amount}
              </div>
              <div className="text-[10px] text-slate-500">
                Charge created on: {currentRecord.encumbrance.statusDate} &bull; Satisfaction Deed: Not Recorded
              </div>
            </div>

            <div className="text-slate-700 text-[11px] leading-relaxed">
              <strong>Observation:</strong> Financial encumbrance undisclosed in recitals of the submitted sale deed. Purchaser risks attachment under SARFAESI recovery.
            </div>

            <div className="bg-blue-50 p-2.5 rounded-lg border border-blue-200 text-blue-950 text-[11px]">
              <strong className="text-blue-900">Statutory Reference for Review:</strong> Section 26D, SARFAESI Act, 2002 & Section 58, Transfer of Property Act, 1882.
            </div>
          </div>
        </div>

        {/* Pillar 4: Land Ceiling & Zoning (Sec 143) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">4. Land Ceiling & Land-Use Zoning</h3>
                <span className="text-[10px] text-slate-500">Revenue Code Classification & Tribal Protection</span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
              Zoning Normal
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">Land Classification:</span>
                <span className="font-bold text-slate-900">{currentRecord.landType} (Krishi)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">Section 80/143 Non-Agri Decl.:</span>
                <span className="text-slate-500 font-mono">Not Declared</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">Section 98/99 SC/ST Land Protection:</span>
                <span className="text-emerald-700 font-bold">General Category Land</span>
              </div>
            </div>

            <div className="text-slate-700 text-[11px] leading-relaxed">
              <strong>Observation:</strong> Transfer does not violate Section 98 (prohibition on transfer of land by SC/ST bhumidhars without Collector permission).
            </div>

            <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 text-emerald-950 text-[11px]">
              <strong className="text-emerald-900">Statutory Reference for Review:</strong> Section 80 & Section 98, Uttar Pradesh Revenue Code, 2006.
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Officer Advisory Directives */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-red-600" />
            <h3 className="font-bold text-slate-900 text-base">
              Recommended Advisory Checklist for Revenue Officer ({officerPersona.replace('_', ' ')})
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Non-Definitive Advisory Protocol
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl border border-red-200 bg-red-50/40 space-y-1.5">
            <div className="font-bold text-red-900">Action 1: Notice under Section 34</div>
            <p className="text-slate-700 text-[11px] leading-relaxed">
              Issue notice to Vendor Rajesh Kumar to furnish death certificate of Late Ramcharan and legal heir certificate (Warasat) prior to title mutation.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40 space-y-1.5">
            <div className="font-bold text-amber-900">Action 2: Require Bank Clearance (NOC)</div>
            <p className="text-slate-700 text-[11px] leading-relaxed">
              Direct the applicant to produce No-Objection Certificate (NOC) or deed of redemption from SBI Gomti Nagar to satisfy CERSAI security charge.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/40 space-y-1.5">
            <div className="font-bold text-blue-900">Action 3: Demarcation under Section 24</div>
            <p className="text-slate-700 text-[11px] leading-relaxed">
              Dispatch Revenue Inspector (Kanungo) with ETS total station to survey the northern PWD road boundary and settle the 0.28 Acre excess area claim.
            </p>
          </div>
        </div>

        <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
          <button
            onClick={() => setCurrentScreen('RECORD_COMPARISON')}
            className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View Historical vs Current Record Comparison ("What Changed?")</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setCurrentScreen('GIS_EXPLORER')}
            className="inline-flex items-center space-x-1.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Verify Cadastral Plot in BhuNaksha GIS</span>
          </button>
        </div>
      </div>
    </div>
  );
};

