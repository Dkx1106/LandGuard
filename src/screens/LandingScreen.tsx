import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  FileCheck,
  Search,
  MapPin,
  AlertTriangle,
  ArrowRight,
  Database,
  Eye,
  CheckCircle,
  TrendingUp,
  Cpu,
  Layers,
  BookOpen
} from 'lucide-react';

export const LandingScreen: React.FC = () => {
  const { setCurrentScreen, setUserRole, quickNavigateToRecord } = useApp();

  const handleLaunchSample = () => {
    quickNavigateToRecord('142/3');
    setUserRole('REVENUE_OFFICER');
    setCurrentScreen('DOC_VERIFICATION');
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Section with Gov Banner */}
      <section className="relative overflow-hidden bg-[#0b192c] text-white py-16 px-4 sm:px-6 lg:px-8 shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-blue-950/80 border border-blue-800 text-blue-300 text-xs px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="font-semibold tracking-wide">Smart India Hackathon 2026 &bull; Theme: GovTech AI</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                LandSure <span className="text-emerald-400">AI</span>: Intelligent Land Record Digitization & Risk Advisory
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                A state-grade, AI-assisted decision support system for Indian Revenue Departments and Citizens. Automating Indic document OCR, spatial cadastral alignment, and multi-registry cross-verification to prevent title disputes before registration.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={handleLaunchSample}
                  className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-3 rounded-lg shadow-lg hover:shadow-emerald-900/30 transition text-sm"
                >
                  <Eye className="w-4 h-4" />
                  <span>Inspect Flagged Record (Khasra 142/3)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setUserRole('CITIZEN');
                    setCurrentScreen('CITIZEN_PORTAL');
                  }}
                  className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-5 py-3 rounded-lg transition text-sm"
                >
                  <Search className="w-4 h-4 text-emerald-400" />
                  <span>Citizen "Verify Before You Buy"</span>
                </button>

                <button
                  onClick={() => setCurrentScreen('ROLE_SELECT')}
                  className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium px-4 py-3 rounded-lg transition text-sm border border-slate-700"
                >
                  <span>Select Role / Persona</span>
                </button>
              </div>

              {/* Verified Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 border-t border-slate-800">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>UP Bhulekh RoR Aligned</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>BhuNaksha Cadastral Mapping</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>CERSAI & e-Courts Bridge</span>
                </div>
              </div>
            </div>

            {/* Right Hero Live KPI Panel */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-sm tracking-wide text-slate-200">
                    Live System Telemetry (Demo)
                  </span>
                </div>
                <span className="text-[11px] bg-emerald-950 text-emerald-400 border border-emerald-800/80 px-2 py-0.5 rounded font-mono font-medium">
                  State Active
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">Parcels Digitized</div>
                  <div className="text-2xl font-black text-white mt-1">1,482,910</div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-medium">
                    <TrendingUp className="w-3 h-3" /> +14.2% this quarter
                  </div>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">Indic OCR Accuracy</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1">98.4%</div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    LayoutLM Indic Model v3
                  </div>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">Anomalies Flagged</div>
                  <div className="text-2xl font-black text-amber-400 mt-1">42,190</div>
                  <div className="text-[11px] text-amber-300/80 mt-1">
                    Pre-registration screen
                  </div>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">Revenue Circles</div>
                  <div className="text-2xl font-black text-white mt-1">350+</div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Across 75 UP Districts
                  </div>
                </div>
              </div>

              {/* Quick Sample Callout */}
              <div className="bg-blue-950/70 p-3.5 rounded-lg border border-blue-900 text-xs flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white">Active Case Loaded:</span>
                  <div className="text-slate-300 text-[11px] mt-0.5">
                    Khasra 142/3 &bull; Rajesh Kumar &bull; Lucknow (Area & Stay Flags)
                  </div>
                </div>
                <button
                  onClick={handleLaunchSample}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded font-semibold text-[11px] shrink-0 ml-2"
                >
                  Inspect
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Navigation Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Choose Your Operational Workflow</h2>
          <p className="text-sm text-slate-500 mt-1">
            Simulate LandSure AI from the perspective of all statutory stakeholders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Revenue Officer Card */}
          <div
            onClick={() => {
              setUserRole('REVENUE_OFFICER');
              setCurrentScreen('DASHBOARD');
            }}
            className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center font-bold mb-3 group-hover:bg-blue-900 group-hover:text-white transition">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-900">Revenue Officer</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Sub-Registrars & Tehsildars adjudicate deeds, review AI anomaly advisories, and inspect cross-checks.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-900">
              <span>Enter Workspace</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Data Entry Operator Card */}
          <div
            onClick={() => {
              setUserRole('DATA_ENTRY_OPERATOR');
              setCurrentScreen('UPLOAD_PIPELINE');
            }}
            className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold mb-3 group-hover:bg-emerald-800 group-hover:text-white transition">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-800">Data Entry Operator</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Upload historical or registered deeds, trigger bilateral Indic OCR, and review bounding-box extractions.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
              <span>Start Ingestion</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Citizen Card */}
          <div
            onClick={() => {
              setUserRole('CITIZEN');
              setCurrentScreen('CITIZEN_PORTAL');
            }}
            className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-amber-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-900 flex items-center justify-center font-bold mb-3 group-hover:bg-amber-800 group-hover:text-white transition">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-amber-900">Citizen / Buyer</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                "Verify Before You Buy" public portal to generate instant Land Health Certificates and check encumbrance.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-900">
              <span>Verify Land Title</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Admin Card */}
          <div
            onClick={() => {
              setUserRole('ADMIN');
              setCurrentScreen('DASHBOARD');
            }}
            className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-800 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-bold mb-3 group-hover:bg-slate-900 group-hover:text-white transition">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-slate-900">System Admin</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                State-level monitoring, district discrepancy heatmaps, and tamper-evident cryptographic audit ledger.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-800">
              <span>Admin Console</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step System Architecture Flow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              End-to-End Workflow Architecture
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
              From Scanned Physical Deed to Verified Digital Title
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="w-8 h-8 mx-auto rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center mb-2">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-xs">Deed Scan Ingestion</h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Bilateral noise reduction, 600 DPI deskewing & stamp detection.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="w-8 h-8 mx-auto rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center mb-2">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-xs">Indic OCR & NER</h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Hindi / English text extraction & Khasra / Khata entity tagging.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="w-8 h-8 mx-auto rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center mb-2">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-xs">Cross-Registry Check</h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Automated bridge to Bhulekh RoR, e-Courts, and CERSAI.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="w-8 h-8 mx-auto rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center mb-2">
                4
              </div>
              <h4 className="font-bold text-slate-900 text-xs">Cadastral GIS Align</h4>
              <p className="text-[11px] text-slate-500 mt-1">
                BhuNaksha boundary polygon intersection & road buffer check.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="w-8 h-8 mx-auto rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center mb-2">
                5
              </div>
              <h4 className="font-bold text-slate-900 text-xs">Officer Adjudication</h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Human-in-the-loop review with advisory statutory references.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Realistic Case Study Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-slate-200 rounded-2xl bg-white p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <h3 className="font-bold text-base text-slate-900">Pre-Loaded Hackathon Test Scenarios</h3>
              <p className="text-xs text-slate-500">
                Click any case to immediately load its data across all 13 application views.
              </p>
            </div>
            <span className="text-[11px] font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">
              Uttar Pradesh Revenue Code Test Datasets
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {/* Scenario 1 */}
            <div
              onClick={() => {
                quickNavigateToRecord('142/3');
                setCurrentScreen('DOC_VERIFICATION');
              }}
              className="p-4 rounded-xl border border-red-200 bg-red-50/40 hover:bg-red-50 hover:shadow-xs transition cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded border border-red-200">
                  Khasra 142/3 (Primary)
                </span>
                <span className="text-red-700 font-semibold">High Caution (74/100)</span>
              </div>
              <div className="font-semibold text-slate-900 text-sm">Rajesh Kumar &bull; Rampur, Lucknow</div>
              <p className="text-xs text-slate-600 mt-1">
                Area mismatch (Claimed 2.10 vs RoR 1.82 Acres), pending Civil Suit stay order, and active SBI mortgage.
              </p>
              <div className="mt-3 text-xs font-semibold text-blue-800 flex items-center gap-1">
                <span>Inspect in Doc Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Scenario 2 */}
            <div
              onClick={() => {
                quickNavigateToRecord('89/1');
                setCurrentScreen('DUPLICATE_DETECTION');
              }}
              className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50 hover:shadow-xs transition cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
                  Khasra 89/1 (Varanasi)
                </span>
                <span className="text-amber-700 font-semibold">Critical Duplicate (88/100)</span>
              </div>
              <div className="font-semibold text-slate-900 text-sm">Virendra Singh &bull; Shivpur, Varanasi</div>
              <p className="text-xs text-slate-600 mt-1">
                Double conveyance alert: Parcel was registered 9 months prior to another buyer under Deed #4981.
              </p>
              <div className="mt-3 text-xs font-semibold text-amber-900 flex items-center gap-1">
                <span>Open Duplicate Analyzer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Scenario 3 */}
            <div
              onClick={() => {
                quickNavigateToRecord('204/A');
                setCurrentScreen('DOC_VERIFICATION');
              }}
              className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50 hover:shadow-xs transition cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                  Khasra 204/A (Ayodhya)
                </span>
                <span className="text-emerald-700 font-semibold">Verified Clean (12/100)</span>
              </div>
              <div className="font-semibold text-slate-900 text-sm">Manish Chaurasia &bull; Darshannagar</div>
              <p className="text-xs text-slate-600 mt-1">
                100% boundary concordance, zero pending court stays, clean CERSAI search, 98.7% OCR confidence.
              </p>
              <div className="mt-3 text-xs font-semibold text-emerald-800 flex items-center gap-1">
                <span>View Verified Record</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

