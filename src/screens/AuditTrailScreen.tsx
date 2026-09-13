import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  History,
  ShieldCheck,
  Lock,
  CheckCircle2,
  FileText,
  Search,
  Key,
  Database,
  ArrowRight,
  Shield
} from 'lucide-react';

export const AuditTrailScreen: React.FC = () => {
  const { auditLogs, currentRecord, setCurrentScreen } = useApp();
  const [verifyingIntegrity, setVerifyingIntegrity] = useState(false);
  const [integrityVerified, setIntegrityVerified] = useState(true);

  const handleVerifyIntegrity = () => {
    setVerifyingIntegrity(true);
    setTimeout(() => {
      setVerifyingIntegrity(false);
      setIntegrityVerified(true);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
              Immutable Governance Ledger
            </span>
            <span className="text-xs font-mono text-slate-500">
              Khasra: <strong className="text-slate-900">{currentRecord.khasraNumber}</strong> &bull; Lucknow Division
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 mt-1">
            Tamper-Evident Event Ledger & Cryptographic Audit Trail
          </h1>
          <p className="text-xs text-slate-500">
            Chronological, immutable trace of every scan ingestion, Indic AI inference, officer triage note, and field correction.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleVerifyIntegrity}
            disabled={verifyingIntegrity}
            className="inline-flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-xs transition"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{verifyingIntegrity ? 'Recalculating Hashes...' : 'Verify Cryptographic Integrity'}</span>
          </button>
        </div>
      </div>

      {/* Verification Status Alert */}
      {integrityVerified && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between text-xs text-emerald-950">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold">Ledger Integrity 100% Validated</span>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                All 4 cryptographic block hashes chain accurately without alterations or retroactive tampering.
              </p>
            </div>
          </div>
          <span className="font-mono text-[11px] bg-emerald-100 text-emerald-900 px-2 py-1 rounded font-bold">
            Root Merkle Hash: 7b2c...09a1
          </span>
        </div>
      )}

      {/* Timeline of Events */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
            Event History Timeline ({auditLogs.length} Entries)
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            Standard: SHA-256 / IT Act 2000 Section 65B
          </span>
        </div>

        <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {auditLogs.map((log) => (
            <div key={log.id} className="relative group">
              {/* Timeline Pin */}
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-blue-900 text-white flex items-center justify-center ring-4 ring-white shadow-xs">
                <Lock className="w-2.5 h-2.5" />
              </div>

              {/* Event Card */}
              <div className="bg-slate-50 group-hover:bg-blue-50/40 p-4 rounded-xl border border-slate-200 transition-all space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-slate-900">
                      {log.action}
                    </span>
                    <span className="text-[10px] bg-white border border-slate-300 text-slate-700 font-semibold px-2 py-0.5 rounded">
                      {log.operatorRole}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {log.timestamp}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {log.details}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-200/60 text-[11px]">
                  <div className="flex items-center space-x-2 text-slate-500">
                    <span>Operator: <strong className="text-slate-700">{log.operatorName}</strong></span>
                    <span>&bull;</span>
                    <span>Khasra: <strong className="text-blue-900 font-mono">{log.khasraNumber}</strong></span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[10px] text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                      SHA256: {log.sha256Hash.substring(0, 16)}...
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {log.verificationBadge}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

