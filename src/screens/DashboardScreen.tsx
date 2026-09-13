import React from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  MapPin,
  Shield,
  Layers,
  Search,
  Scale,
  Eye,
  Filter
} from 'lucide-react';

export const DashboardScreen: React.FC = () => {
  const {
    userRole,
    officerPersona,
    setCurrentScreen,
    quickNavigateToRecord,
    records
  } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner with Officer Context */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
              Division Command Console
            </span>
            <span className="text-xs text-slate-500">
              District: <strong className="text-slate-800">Lucknow</strong> &bull; Circle: <strong className="text-slate-800">Sarojini Nagar</strong>
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            {userRole === 'ADMIN' ? 'State Registry Administration & Anomaly Analytics' : `Revenue Adjudication Dashboard — ${officerPersona.replace('_', ' ')}`}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time telemetry of deed ingestion, Indic OCR bounding boxes, and pre-transaction anomaly screening.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentScreen('UPLOAD_PIPELINE')}
            className="inline-flex items-center space-x-1.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-xs transition"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Upload New Deed</span>
          </button>
          <button
            onClick={() => setCurrentScreen('QUEUE')}
            className="inline-flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-semibold px-3.5 py-2 rounded-lg transition"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Open Triage Queue</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Daily Deeds Ingested</span>
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-800">
              <FileText className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">128</div>
          <div className="flex items-center text-[11px] text-emerald-600 mt-1 font-medium">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>+18.4% vs last week</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Anomalies Flagged</span>
            <span className="p-1.5 rounded-lg bg-red-50 text-red-600">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-red-600 mt-2">19</div>
          <div className="flex items-center text-[11px] text-red-700 mt-1 font-medium">
            <span>Requires statutory officer review</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Average OCR Confidence</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-600 mt-2">94.6%</div>
          <div className="flex items-center text-[11px] text-slate-500 mt-1">
            <span>Indic LayoutLM Pipeline</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Cadastral Matched</span>
            <span className="p-1.5 rounded-lg bg-slate-100 text-slate-700">
              <MapPin className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">99.1%</div>
          <div className="flex items-center text-[11px] text-slate-500 mt-1">
            <span>BhuNaksha UP polygon align</span>
          </div>
        </div>
      </div>

      {/* Main Row: Priority Deeds Awaiting Adjudication + Discrepancy Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Priority Action Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Priority Deeds Awaiting Officer Review</h3>
              <p className="text-[11px] text-slate-500">
                Sorted by AI Anomaly Risk Index & statutory review urgency
              </p>
            </div>
            <button
              onClick={() => setCurrentScreen('QUEUE')}
              className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All (19)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="py-2.5 px-3.5">Khasra / Mauza</th>
                  <th className="py-2.5 px-3.5">Recorded / Claimed Owner</th>
                  <th className="py-2.5 px-3.5">Flagged Observations</th>
                  <th className="py-2.5 px-3.5">Risk Level</th>
                  <th className="py-2.5 px-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map(record => {
                  const isHigh = record.riskScore >= 70;
                  const isMed = record.riskScore >= 40 && record.riskScore < 70;

                  return (
                    <tr key={record.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-3.5">
                        <div className="font-bold text-slate-900 font-mono">
                          {record.khasraNumber}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {record.village}, {record.district}
                        </div>
                      </td>
                      <td className="py-3 px-3.5">
                        <div className="font-medium text-slate-800">{record.ownerName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Khata: {record.khataNumber} &bull; {record.claimedAreaAcres} Acres
                        </div>
                      </td>
                      <td className="py-3 px-3.5 max-w-xs">
                        {record.anomalies.length > 0 ? (
                          <div className="space-y-1">
                            {record.anomalies.slice(0, 2).map((a, idx) => (
                              <span
                                key={idx}
                                className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded border mr-1 ${
                                  a.severity === 'CRITICAL'
                                    ? 'bg-red-50 text-red-700 border-red-200'
                                    : a.severity === 'HIGH'
                                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                                    : 'bg-blue-50 text-blue-800 border-blue-200'
                                }`}
                              >
                                {a.title}
                              </span>
                            ))}
                            {record.anomalies.length > 2 && (
                              <span className="text-[10px] text-slate-400 font-medium">
                                +{record.anomalies.length - 2} more
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Title Concordance Clean
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3.5">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`font-bold text-xs ${
                              isHigh ? 'text-red-700' : isMed ? 'text-amber-700' : 'text-emerald-700'
                            }`}
                          >
                            {record.riskScore}/100
                          </span>
                          <span
                            className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold ${
                              isHigh
                                ? 'bg-red-100 text-red-800'
                                : isMed
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {isHigh ? 'Caution' : isMed ? 'Moderate' : 'Low'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3.5 text-right">
                        <button
                          onClick={() => {
                            quickNavigateToRecord(record.khasraNumber);
                            setCurrentScreen('DOC_VERIFICATION');
                          }}
                          className="bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 px-2.5 py-1.5 rounded text-[11px] font-semibold transition inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Adjudicate</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Anomaly Distribution & Circle Index (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Anomaly Breakdown Box */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wide">
              Observed Anomaly Breakdown
            </h3>
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Area Discrepancies (RoR vs Deed)</span>
                  <span className="font-bold text-amber-700">42% (8 cases)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Active Court Stays (e-Courts)</span>
                  <span className="font-bold text-red-700">26% (5 cases)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full rounded-full" style={{ width: '26%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>CERSAI Banking Charges</span>
                  <span className="font-bold text-blue-700">21% (4 cases)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '21%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Potential Duplicate Conveyance</span>
                  <span className="font-bold text-purple-700">11% (2 cases)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-600 h-full rounded-full" style={{ width: '11%' }}></div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={() => setCurrentScreen('CROSS_VERIFICATION')}
                className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 transition flex items-center justify-center gap-1"
              >
                <Shield className="w-3.5 h-3.5 text-blue-700" />
                <span>Open Pre-Transaction Risk Radar</span>
              </button>
            </div>
          </div>

          {/* Tehsil Health Index */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wide">
              Lucknow Tehsil Health Index
            </h3>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">Sarojini Nagar</div>
                  <div className="text-[10px] text-slate-400">Rampur, Bani, Mohan Mauzas</div>
                </div>
                <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  4 Discrepancies
                </span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">Lucknow Sadar</div>
                  <div className="text-[10px] text-slate-400">Gomti Nagar, Chinhat</div>
                </div>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  98.8% Concordant
                </span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">Malihabad</div>
                  <div className="text-[10px] text-slate-400">Agricultural mango orchards</div>
                </div>
                <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  2 Pending Surveys
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

