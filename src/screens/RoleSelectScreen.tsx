import React from 'react';
import { useApp } from '../context/AppContext';
import { UserRole, OfficerPersona } from '../types';
import {
  Shield,
  FileCheck,
  Search,
  Layers,
  CheckCircle,
  ArrowRight,
  Lock,
  UserCheck,
  Stamp,
  Scale
} from 'lucide-react';

export const RoleSelectScreen: React.FC = () => {
  const {
    userRole,
    setUserRole,
    officerPersona,
    setOfficerPersona,
    setCurrentScreen
  } = useApp();

  const handleSelectRole = (role: UserRole, targetScreen: any) => {
    setUserRole(role);
    setCurrentScreen(targetScreen);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-900 text-xs px-3 py-1 rounded-full font-semibold">
          <span>Role-Based Access Control (RBAC) Simulation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Select Statutory Persona
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          LandSure AI provides dedicated interfaces tailored to statutory duties under the UP Revenue Code & Registration Act.
        </p>
      </div>

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Role 1: Revenue Officer */}
        <div className={`rounded-2xl border p-6 transition-all ${
          userRole === 'REVENUE_OFFICER'
            ? 'border-blue-600 bg-white ring-2 ring-blue-500/20 shadow-md'
            : 'border-slate-200 bg-white hover:border-slate-300'
        }`}>
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
              <Scale className="w-6 h-6" />
            </div>
            {userRole === 'REVENUE_OFFICER' && (
              <span className="bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Currently Active
              </span>
            )}
          </div>

          <h3 className="font-extrabold text-lg text-slate-900 mt-4">
            Revenue Officer (RO)
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Statutory authority responsible for deed registration, mutation (Dakhil-Kharij), dispute adjudication, and ordering field demarcation.
          </p>

          {/* Contextual Persona Picker */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Select Contextual Designation:
            </span>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[
                { id: 'SUB_REGISTRAR', label: 'Sub-Registrar', desc: 'Deed Registration & Stamp Duty' },
                { id: 'TEHSILDAR', label: 'Tehsildar', desc: 'Mutation & Summary Inquiries' },
                { id: 'KANUNGO', label: 'Revenue Inspector', desc: 'Field Demarcation & RoR' }
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setOfficerPersona(p.id as OfficerPersona)}
                  className={`p-2 rounded-lg border text-left text-xs transition ${
                    officerPersona === p.id
                      ? 'bg-blue-50 border-blue-600 text-blue-900 font-semibold'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold text-[11px]">{p.label}</div>
                  <div className="text-[9px] text-slate-500 line-clamp-1">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">Perms: Full Adjudication</span>
            <button
              onClick={() => handleSelectRole('REVENUE_OFFICER', 'DASHBOARD')}
              className="inline-flex items-center space-x-1.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg text-xs transition"
            >
              <span>Launch Officer Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Role 2: Data Entry Operator */}
        <div className={`rounded-2xl border p-6 transition-all ${
          userRole === 'DATA_ENTRY_OPERATOR'
            ? 'border-emerald-600 bg-white ring-2 ring-emerald-500/20 shadow-md'
            : 'border-slate-200 bg-white hover:border-slate-300'
        }`}>
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <FileCheck className="w-6 h-6" />
            </div>
            {userRole === 'DATA_ENTRY_OPERATOR' && (
              <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Currently Active
              </span>
            )}
          </div>

          <h3 className="font-extrabold text-lg text-slate-900 mt-4">
            Data Entry Operator (DEO)
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Tehsil Digitization Centre operator specializing in high-speed document ingestion, bilateral scanning filters, and bounding-box validation.
          </p>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Bulk scanned deed & Jamabandi ingestion</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>OCR Bounding Box visual correction & OCR transcription</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Forward sanitized digital records to Revenue Officer queue</span>
            </div>
          </div>

          <div className="mt-7 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">Perms: Ingest & Transcribe</span>
            <button
              onClick={() => handleSelectRole('DATA_ENTRY_OPERATOR', 'UPLOAD_PIPELINE')}
              className="inline-flex items-center space-x-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg text-xs transition"
            >
              <span>Launch Ingestion Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Role 3: Citizen / Buyer */}
        <div className={`rounded-2xl border p-6 transition-all ${
          userRole === 'CITIZEN'
            ? 'border-amber-600 bg-white ring-2 ring-amber-500/20 shadow-md'
            : 'border-slate-200 bg-white hover:border-slate-300'
        }`}>
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center font-bold">
              <Search className="w-6 h-6" />
            </div>
            {userRole === 'CITIZEN' && (
              <span className="bg-amber-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Currently Active
              </span>
            )}
          </div>

          <h3 className="font-extrabold text-lg text-slate-900 mt-4">
            Citizen / Prospective Land Buyer
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Public transparent portal enabling citizens, farmers, and investors to verify land parcels before handing over financial advances.
          </p>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Instant Khasra title search by District/Tehsil/Village</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Official "Land Health Certificate" generation with QR seal</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Plain-language warnings for active bank mortgages & stays</span>
            </div>
          </div>

          <div className="mt-7 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">Perms: Public Search & Print</span>
            <button
              onClick={() => handleSelectRole('CITIZEN', 'CITIZEN_PORTAL')}
              className="inline-flex items-center space-x-1.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold px-4 py-2 rounded-lg text-xs transition"
            >
              <span>Open Citizen Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Role 4: System Administrator */}
        <div className={`rounded-2xl border p-6 transition-all ${
          userRole === 'ADMIN'
            ? 'border-slate-800 bg-white ring-2 ring-slate-800/20 shadow-md'
            : 'border-slate-200 bg-white hover:border-slate-300'
        }`}>
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
              <Layers className="w-6 h-6" />
            </div>
            {userRole === 'ADMIN' && (
              <span className="bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Currently Active
              </span>
            )}
          </div>

          <h3 className="font-extrabold text-lg text-slate-900 mt-4">
            System Administrator / NIC Coordinator
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Oversees state-wide digitisation throughput, model drift telemetry, API bridge health, and immutable audit logs.
          </p>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-slate-700 shrink-0" />
              <span>District-wise discrepancy indexing and anomaly heatmaps</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-slate-700 shrink-0" />
              <span>Cryptographic SHA-256 tamper-evident event ledger</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-slate-700 shrink-0" />
              <span>System telemetry & ML pipeline confidence monitoring</span>
            </div>
          </div>

          <div className="mt-7 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">Perms: System Config & Audit</span>
            <button
              onClick={() => handleSelectRole('ADMIN', 'DASHBOARD')}
              className="inline-flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-lg text-xs transition"
            >
              <span>Access Admin Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

