import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  Filter,
  Search,
  AlertTriangle,
  CheckCircle2,
  Eye,
  ArrowRight,
  UserCheck,
  Building,
  Scale
} from 'lucide-react';

export const QueueScreen: React.FC = () => {
  const { records, setCurrentScreen, quickNavigateToRecord, officerPersona } = useApp();
  const [filter, setFilter] = useState<'ALL' | 'FLAGGED' | 'CLEAN'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecords = records.filter(r => {
    if (filter === 'FLAGGED' && r.status !== 'FLAGGED_ANOMALY') return false;
    if (filter === 'CLEAN' && r.status !== 'VERIFIED') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.khasraNumber.toLowerCase().includes(q) ||
        r.ownerName.toLowerCase().includes(q) ||
        r.village.toLowerCase().includes(q) ||
        r.district.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
              Statutory Triage Queue
            </span>
            <span className="text-xs text-slate-500">
              Assigned to: <strong className="text-slate-800">{officerPersona.replace('_', ' ')}</strong> (Sarojini Nagar Circle)
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 mt-1">
            Human-in-the-Loop Document Verification Inbox
          </h1>
          <p className="text-xs text-slate-500">
            Deeds flagged by AI algorithms for human officer review under the UP Public Services Delivery Guarantee Act.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="bg-amber-100 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>SLA: 48 Hours Limit</span>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search Khasra (e.g. 142/3), Owner, Village..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status Filters */}
        <div className="flex space-x-1.5 w-full sm:w-auto overflow-x-auto text-xs">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              filter === 'ALL'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Deeds ({records.length})
          </button>
          <button
            onClick={() => setFilter('FLAGGED')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1 ${
              filter === 'FLAGGED'
                ? 'bg-red-700 text-white shadow-xs'
                : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Flagged for Review</span>
          </button>
          <button
            onClick={() => setFilter('CLEAN')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1 ${
              filter === 'CLEAN'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Concordant (Clean)</span>
          </button>
        </div>
      </div>

      {/* Records Queue List */}
      <div className="space-y-3">
        {filteredRecords.map(record => {
          const isHighRisk = record.riskScore >= 70;
          const isMedium = record.riskScore >= 40 && record.riskScore < 70;

          return (
            <div
              key={record.id}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 transition-all shadow-xs"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isHighRisk
                        ? 'bg-red-100 text-red-800'
                        : isMedium
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isHighRisk ? (
                      <AlertTriangle className="w-5 h-5" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900 font-mono">
                        Khasra {record.khasraNumber}
                      </span>
                      <span className="text-slate-400">&bull;</span>
                      <span className="text-xs text-slate-600 font-medium">
                        Village: {record.village} ({record.tehsil}, {record.district})
                      </span>
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          record.status === 'FLAGGED_ANOMALY'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {record.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="text-xs text-slate-700 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                      <span>Owner: <strong>{record.ownerName}</strong></span>
                      <span>Claimed Area: <strong>{record.claimedAreaAcres} Acres</strong></span>
                      <span>RoR Area: <strong>{record.areaAcres} Acres</strong></span>
                      <span>Consideration: <strong>{record.considerationAmount}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Risk Score Pill & Action */}
                <div className="flex items-center space-x-4 shrink-0">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Risk Index</div>
                    <div
                      className={`text-base font-black ${
                        isHighRisk
                          ? 'text-red-700'
                          : isMedium
                          ? 'text-amber-700'
                          : 'text-emerald-700'
                      }`}
                    >
                      {record.riskScore}/100
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      quickNavigateToRecord(record.khasraNumber);
                      setCurrentScreen('DOC_VERIFICATION');
                    }}
                    className="bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-xs transition inline-flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Open Workspace</span>
                  </button>
                </div>
              </div>

              {/* Anomaly Badges */}
              {record.anomalies.length > 0 && (
                <div className="mt-3 pt-1 flex flex-wrap gap-2 items-center">
                  <span className="text-[11px] font-semibold text-slate-500">
                    Observations Identified:
                  </span>
                  {record.anomalies.map((a, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded bg-red-50 text-red-800 border border-red-200"
                    >
                      {a.title}
                    </span>
                  ))}
                  <button
                    onClick={() => {
                      quickNavigateToRecord(record.khasraNumber);
                      setCurrentScreen('RECORD_COMPARISON');
                    }}
                    className="text-[11px] font-semibold text-blue-800 hover:text-blue-950 ml-auto flex items-center gap-1"
                  >
                    <span>Check Historical Diff</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

