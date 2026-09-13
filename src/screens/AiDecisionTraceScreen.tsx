import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Brain,
  Scale,
  ShieldAlert,
  HelpCircle,
  CheckCircle,
  FileText,
  AlertTriangle,
  ArrowRight,
  Info,
  Layers,
  Sparkles
} from 'lucide-react';

export const AiDecisionTraceScreen: React.FC = () => {
  const { currentRecord, setCurrentScreen, officerPersona } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
              Explainable AI (XAI) & Regulatory Trace
            </span>
            <span className="text-xs font-mono text-slate-500">
              Khasra: <strong className="text-blue-900">{currentRecord.khasraNumber}</strong> &bull; Rampur, Lucknow
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 mt-1">
            AI Decision Trace & Identified Regulatory References
          </h1>
          <p className="text-xs text-slate-500">
            Transparent breakdown of why specific anomalies were flagged and relevant legal/regulatory references identified for officer review.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentScreen('CROSS_VERIFICATION')}
            className="inline-flex items-center space-x-1.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Risk Advisory</span>
          </button>
        </div>
      </div>

      {/* Statutory Human-in-the-Loop Advisory Warning */}
      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 flex items-start gap-3.5 text-amber-950">
        <div className="p-2.5 bg-amber-600 text-white rounded-xl shrink-0 mt-0.5 shadow-xs">
          <Scale className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">
              Statutory Non-Definitive Stance
            </span>
            <span className="font-bold text-sm">Human Authority Supremacy Notice</span>
          </div>
          <p className="text-xs mt-1 leading-relaxed text-amber-900">
            The algorithms in LandSure AI do <strong>not</strong> make binding judicial or statutory conclusions. They identify patterns, geometric discrepancies, and cross-database mismatches to surface <strong className="font-semibold text-amber-950">relevant legal and regulatory provisions for competent Revenue Officers to review</strong>. All statutory authority for title mutation and deed registration resides exclusively with the presiding Revenue Officer / Sub-Registrar.
          </p>
        </div>
      </div>

      {/* Observation-by-Observation Trace Breakdown */}
      <div className="space-y-4">
        <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
          Identified Potential Anomalies & Regulatory Guidance For Review
        </h3>

        {currentRecord.anomalies.map((item, idx) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </span>
                <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] text-slate-400 font-mono">Sources: {item.sourceDatabases.join(' + ')}</span>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    item.severity === 'CRITICAL'
                      ? 'bg-red-100 text-red-800'
                      : item.severity === 'HIGH'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {item.severity} Severity
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
              {/* Why Flagged (7 cols) */}
              <div className="md:col-span-7 space-y-2">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                  Observed Pattern & System Rationale
                </span>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {item.description}
                </p>
                <div className="text-[11px] text-blue-900 bg-blue-50/70 p-2.5 rounded-lg border border-blue-200">
                  <strong className="text-blue-950">Recommended Officer Action:</strong> {item.officerAdvisoryNote}
                </div>
              </div>

              {/* Regulatory References (5 cols) */}
              <div className="md:col-span-5 bg-amber-50/50 p-3.5 rounded-xl border border-amber-200 space-y-2">
                <span className="text-[10px] text-amber-900 font-bold uppercase flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5 text-amber-700" />
                  <span>Relevant Legal / Regulatory Reference Identified For Review</span>
                </span>
                <p className="text-amber-950 font-semibold text-xs leading-relaxed">
                  {item.statutoryReference}
                </p>
                <div className="text-[10px] text-slate-500 pt-2 border-t border-amber-200/60 leading-normal">
                  Officer Guidance: Verify compliance with the statutory provisions cited before endorsing registration or finalizing Khatauni mutation.
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Model Interpretability Feature Weights */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm">
              Indic LayoutLM & Risk Factor Attribution Weights
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Model Version: IndicLayout-v3.2.1-Prod
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">
              Title Concordance Weight
            </span>
            <div className="text-lg font-black text-slate-900 mt-1">35%</div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-blue-600 h-full" style={{ width: '35%' }}></div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">
              Judicial Injunction Weight
            </span>
            <div className="text-lg font-black text-red-600 mt-1">30%</div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-red-600 h-full" style={{ width: '30%' }}></div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">
              Banking Encumbrance Weight
            </span>
            <div className="text-lg font-black text-amber-600 mt-1">20%</div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-amber-600 h-full" style={{ width: '20%' }}></div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">
              Spatial Cadastral Alignment
            </span>
            <div className="text-lg font-black text-emerald-600 mt-1">15%</div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-600 h-full" style={{ width: '15%' }}></div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Audited for bias & Indic script variance across Devanagari numerals and Kaithi script conventions.
          </span>
          <button
            onClick={() => setCurrentScreen('AUDIT_TRAIL')}
            className="text-blue-900 hover:text-blue-700 font-semibold flex items-center gap-1"
          >
            <span>Inspect Audit Cryptographic Trail</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

