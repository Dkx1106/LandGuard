import React from 'react';
import { useApp } from '../context/AppContext';
import {
  History,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  FileText,
  Scale,
  Download,
  Info,
  Layers,
  ArrowLeftRight
} from 'lucide-react';

export const RecordComparisonScreen: React.FC = () => {
  const { currentRecord, setCurrentScreen, officerPersona } = useApp();
  const history = currentRecord.history;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
              Record Lineage & Mutation Audit
            </span>
            <span className="text-xs font-mono text-slate-500">
              Khasra: <strong className="text-blue-900">{currentRecord.khasraNumber}</strong> &bull; Rampur, Lucknow
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 mt-1">
            "What Changed?" &bull; Historical Record vs Current Submission Diff
          </h1>
          <p className="text-xs text-slate-500">
            Side-by-side comparison of the last digitized RoR (1428 Fasli / 2018) against the newly submitted 2026 Sale Deed with automated discrepancy highlighting.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentScreen('DOC_VERIFICATION')}
            className="inline-flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3.5 py-2 rounded-lg border border-slate-300 transition"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Doc Workspace</span>
          </button>
          <button
            onClick={() => setCurrentScreen('CROSS_VERIFICATION')}
            className="inline-flex items-center space-x-1.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Risk Advisory</span>
          </button>
        </div>
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Historical Official Record */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <History className="w-5 h-5 text-slate-600" />
              <div>
                <h3 className="font-bold text-sm text-slate-900">Historical Record of Rights (RoR)</h3>
                <span className="text-[10px] text-slate-500 font-mono">
                  {history.fasliYear} ({history.lastRecordedYear}) &bull; Tehsil Record Room
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
              Baseline
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                Recorded Co-Bhumidhars (Owners)
              </span>
              <div className="font-bold text-slate-900 text-sm mt-0.5">
                {history.recordedOwners.join(' + ')}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Equal 50-50% undivided co-tenancy recorded in Khatauni
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                Settled Total Parcel Area
              </span>
              <div className="font-bold text-slate-900 text-sm font-mono mt-0.5">
                {history.recordedAreaAcres} Acres (0.736 Hectares)
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Cadastral Survey Settlement 1425 Fasli
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                Historical Chauhaddi (Boundaries)
              </span>
              <div className="mt-1 space-y-1 text-[11px] text-slate-700">
                <div><strong>North:</strong> {history.boundaries.north}</div>
                <div><strong>South:</strong> {history.boundaries.south}</div>
                <div><strong>East:</strong> {history.boundaries.east}</div>
                <div><strong>West:</strong> {history.boundaries.west}</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                Encumbrance / Lien Column
              </span>
              <div className="font-bold text-emerald-700 mt-0.5">
                Clean (No charges registered in 2018)
              </div>
            </div>
          </div>
        </div>

        {/* Right: Current Submitted Deed */}
        <div className="bg-white rounded-2xl border-2 border-red-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-red-100">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-red-600" />
              <div>
                <h3 className="font-bold text-sm text-slate-900">Current Submitted Sale Deed</h3>
                <span className="text-[10px] text-slate-500 font-mono">
                  {currentRecord.deedRegistrationNo} &bull; 2026 Submission
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-red-100 text-red-800 px-2 py-0.5 rounded font-mono">
              Proposed Changes
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-red-50/70 border border-red-200">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-red-800 font-bold uppercase">
                  Vendor Claimed Title
                </span>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
                  Modified
                </span>
              </div>
              <div className="font-bold text-red-900 text-sm mt-0.5">
                {currentRecord.ownerName} (Claiming 100% Sole Ownership)
              </div>
              <div className="text-[10px] text-red-700 mt-0.5">
                Ramcharan omitted without certified Warasat/Succession order
              </div>
            </div>

            <div className="p-3 rounded-lg bg-red-50/70 border border-red-200">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-red-800 font-bold uppercase">
                  Conveyed Claimed Area
                </span>
                <span className="text-[10px] font-bold bg-red-200 text-red-900 px-1.5 py-0.5 rounded">
                  +0.28 Acre Discrepancy
                </span>
              </div>
              <div className="font-bold text-red-900 text-sm font-mono mt-0.5">
                {currentRecord.claimedAreaAcres} Acres (0.849 Hectares)
              </div>
              <div className="text-[10px] text-red-700 mt-0.5">
                Claims 2.10 Acres vs Official Record 1.82 Acres (+15.4% excess)
              </div>
            </div>

            <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-amber-800 font-bold uppercase">
                  Current Claimed Chauhaddi
                </span>
                <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">
                  Encroachment Flag
                </span>
              </div>
              <div className="mt-1 space-y-1 text-[11px] text-slate-800">
                <div className="text-red-800 font-bold"><strong>North:</strong> {currentRecord.boundaries.north} (Zero setback)</div>
                <div><strong>South:</strong> {currentRecord.boundaries.south}</div>
                <div><strong>East:</strong> {currentRecord.boundaries.east}</div>
                <div><strong>West:</strong> {currentRecord.boundaries.west}</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-red-50/70 border border-red-200">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-red-800 font-bold uppercase">
                  Encumbrance Column
                </span>
                <span className="text-[10px] font-bold bg-red-200 text-red-900 px-1.5 py-0.5 rounded">
                  Undisclosed Charge
                </span>
              </div>
              <div className="font-bold text-red-900 mt-0.5">
                Active SBI Mortgage ₹35 Lakhs (CERSAI-LKO-2022-094812)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Difference Breakdown Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <ArrowLeftRight className="w-5 h-5 text-blue-900" />
            <h3 className="font-bold text-slate-900 text-sm">
              Detailed Lineage Discrepancy Matrix
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            {history.changesIdentified.length} Primary Discrepancies Identified
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-2.5 px-3.5">Field / Attribute</th>
                <th className="py-2.5 px-3.5">Historical Baseline (2018)</th>
                <th className="py-2.5 px-3.5">Submitted Deed (2026)</th>
                <th className="py-2.5 px-3.5">Change Type</th>
                <th className="py-2.5 px-3.5">Statutory Officer Advisory Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history.changesIdentified.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80">
                  <td className="py-3 px-3.5 font-bold text-slate-800">{item.field}</td>
                  <td className="py-3 px-3.5 text-slate-600 font-mono">{item.historicalVal}</td>
                  <td className="py-3 px-3.5 font-bold text-red-700 font-mono">{item.currentVal}</td>
                  <td className="py-3 px-3.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.changeType === 'MODIFIED'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.changeType}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-slate-700 leading-relaxed max-w-sm">
                    {item.advisoryNote}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <span className="text-slate-500">
            Export formatted Section 34 inquiry note to Revenue Court of Tehsildar Sarojini Nagar.
          </span>
          <button
            onClick={() => setCurrentScreen('AUDIT_TRAIL')}
            className="inline-flex items-center space-x-1.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            <span>View Cryptographic Audit Trail</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

