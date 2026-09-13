import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  CheckCircle,
  AlertTriangle,
  Edit2,
  Check,
  X,
  Eye,
  Shield,
  ArrowRight,
  Stamp,
  Layers,
  HelpCircle,
  Scale,
  Sparkles,
  History
} from 'lucide-react';

export const DocVerificationScreen: React.FC = () => {
  const {
    currentRecord,
    activeBBoxId,
    setActiveBBoxId,
    updateRecordField,
    resolveAnomaly,
    setCurrentScreen,
    userRole,
    officerPersona
  } = useApp();

  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'FIELDS' | 'ANOMALIES'>('FIELDS');

  const handleStartEdit = (fieldKey: string, initialVal: any) => {
    setEditingField(fieldKey);
    setEditValue(String(initialVal));
  };

  const handleSaveEdit = (fieldKey: string) => {
    updateRecordField(fieldKey, editValue);
    setEditingField(null);
  };

  const activeBox = currentRecord.boundingBoxes.find(b => b.id === activeBBoxId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner & Quick Record Navigation */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
              Interactive Verification Workspace
            </span>
            <span className="text-xs text-slate-500">
              Deed Ref: <strong className="text-slate-800 font-mono">{currentRecord.deedRegistrationNo}</strong>
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 mt-1">
            Scanned Deed vs Extracted Digital Record Inspector
          </h1>
          <p className="text-xs text-slate-500">
            Click any bounding box on the scanned deed to jump to its corresponding extracted field and inspect confidence scores.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentScreen('RECORD_COMPARISON')}
            className="inline-flex items-center space-x-1 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-semibold px-3 py-2 rounded-lg transition"
          >
            <History className="w-3.5 h-3.5" />
            <span>"What Changed?" Diff</span>
          </button>
          <button
            onClick={() => setCurrentScreen('CROSS_VERIFICATION')}
            className="inline-flex items-center space-x-1 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Risk Advisory</span>
          </button>
        </div>
      </div>

      {/* Main Split-Screen Workspace (50% Document Scan vs 50% Extracted Fields) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Scanned Document Viewer with Interactive Bounding Boxes (6 cols) */}
        <div className="lg:col-span-6 bg-slate-800 rounded-2xl border border-slate-700 p-4 shadow-md flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700 text-white text-xs">
            <div className="flex items-center space-x-2">
              <Stamp className="w-4 h-4 text-amber-400" />
              <span className="font-bold tracking-wide">Scanned Deed Original (High-Res 600 DPI)</span>
            </div>
            <span className="text-[10px] font-mono bg-slate-700 px-2 py-0.5 rounded text-slate-300">
              Interactive Bounding Boxes Active
            </span>
          </div>

          {/* Scanned Document Canvas */}
          <div className="relative mt-3 w-full bg-[#faf7ee] text-slate-800 rounded-xl p-5 shadow-inner border border-amber-200/50 min-h-[580px] font-serif select-none overflow-hidden">
            {/* Gov Watermark / Stamp simulation */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <div className="w-80 h-80 rounded-full border-8 border-slate-900 flex items-center justify-center text-4xl font-black">
                GOVT OF UP
              </div>
            </div>

            {/* Document Header Text Simulation */}
            <div className="text-center pb-4 border-b-2 border-slate-900/40">
              <div className="text-[10px] tracking-widest font-sans font-bold text-slate-600 uppercase">
                Government of Uttar Pradesh &bull; Registration & Stamps Department
              </div>
              <div className="text-base font-extrabold text-slate-900 mt-0.5 uppercase tracking-wide">
                Registered Deed of Conveyance / विक्रय पत्र
              </div>
              <div className="text-[9px] font-mono text-slate-500">
                Book No. 1, Jild 10492, Pages 1-14 &bull; Sub-Registrar IV, Lucknow
              </div>
            </div>

            {/* Render Simulated Document Paragraphs */}
            <div className="mt-4 space-y-4 text-[11px] leading-relaxed text-slate-800 font-sans">
              <p>
                <strong>This Deed of Absolute Sale</strong> is executed on this 14th day of February 2026 at Lucknow by <strong>Rajesh Kumar</strong>, s/o Late Ramcharan, resident of Village Rampur, Pargana Bijnor, Tehsil Sarojini Nagar, District Lucknow (hereinafter called the VENDOR).
              </p>
              <p>
                <strong>IN FAVOUR OF</strong> M/s Avadh Housing & Infrastructure Pvt Ltd, having registered office at Hazratganj, Lucknow (hereinafter called the VENDEE).
              </p>
              <p>
                <strong>WHEREAS</strong> the Vendor is in exclusive possession of Agricultural Land situated at <strong>Village Rampur, Khasra No. 142/3, Khatauni Khata No. 00482</strong>, measuring an area of <strong>2.10 Acres</strong> (Two point one zero acres).
              </p>
              <p>
                <strong>BOUNDARIES (CHAUHADDI):</strong> North: PWD Village Link Road; South: Field of Suresh Verma (Plot 142/4); East: Minor Irrigation Canal; West: Gram Sabha Land (141).
              </p>
              <p>
                <strong>CONSIDERATION:</strong> The total agreed sale consideration is <strong>₹ 84,50,000/-</strong> (Rupees Eighty Four Lakh Fifty Thousand Only), against which total stamp duty of <strong>₹ 5,91,500/-</strong> has been deposited through e-Challan #IN-UP298492019488.
              </p>
            </div>

            {/* Interactive Bounding Box Overlays */}
            {currentRecord.boundingBoxes.map(box => {
              const isSelected = activeBBoxId === box.id;
              const isFlagged = box.isFlagged;

              let borderStyle = isSelected
                ? 'border-blue-600 bg-blue-500/20 ring-2 ring-blue-600 shadow-md'
                : isFlagged
                ? 'border-red-500 bg-red-500/10 hover:bg-red-500/20'
                : 'border-emerald-600 bg-emerald-500/10 hover:bg-emerald-500/20';

              return (
                <div
                  key={box.id}
                  onClick={() => setActiveBBoxId(box.id)}
                  style={{
                    left: `${box.box.x}%`,
                    top: `${box.box.y}%`,
                    width: `${box.box.width}%`,
                    height: `${box.box.height}%`
                  }}
                  className={`absolute rounded cursor-pointer border-2 transition-all p-1 flex flex-col justify-between ${borderStyle}`}
                  title={`${box.label} (${box.confidence}% conf)`}
                >
                  <div className="flex items-center justify-between text-[9px] font-sans font-bold">
                    <span className="bg-slate-900/90 text-white px-1 rounded shadow-xs">
                      {box.label}
                    </span>
                    <span
                      className={`px-1 rounded text-white ${
                        isFlagged ? 'bg-red-700' : 'bg-emerald-700'
                      }`}
                    >
                      {box.confidence}%
                    </span>
                  </div>

                  {isFlagged && (
                    <div className="text-[9px] font-sans font-bold bg-red-800 text-white px-1 py-0.5 rounded flex items-center gap-1 shadow-xs">
                      <AlertTriangle className="w-2.5 h-2.5" />
                      <span>Review Flagged</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Document Scan Footer Info */}
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
            <span>Color Spectrum: 24-bit TrueColor</span>
            <span className="text-emerald-400 font-mono">Bilateral Deskew Angle: -1.24°</span>
          </div>
        </div>

        {/* RIGHT: Structured Digital Field Extraction & Inline Editor (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Header Card with Confidence Gauge */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Extracted Digital Land Record Fields
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-500 font-medium">Composite Confidence:</span>
                <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {currentRecord.confidenceScore}%
                </span>
              </div>
            </div>

            {/* Quick Tab Switcher */}
            <div className="flex space-x-2 mt-3 text-xs">
              <button
                onClick={() => setActiveTab('FIELDS')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  activeTab === 'FIELDS'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Extracted Fields ({currentRecord.boundingBoxes.length})
              </button>
              <button
                onClick={() => setActiveTab('ANOMALIES')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1 ${
                  activeTab === 'ANOMALIES'
                    ? 'bg-red-700 text-white shadow-xs'
                    : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Flagged Observations ({currentRecord.anomalies.length})</span>
              </button>
            </div>
          </div>

          {/* Tab 1: Extracted Fields List */}
          {activeTab === 'FIELDS' && (
            <div className="space-y-3">
              {currentRecord.boundingBoxes.map(box => {
                const isSelected = activeBBoxId === box.id;
                const isEditing = editingField === box.fieldKey;

                return (
                  <div
                    key={box.id}
                    onClick={() => setActiveBBoxId(box.id)}
                    className={`bg-white p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-blue-600 shadow-md ring-1 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-slate-700 font-mono uppercase">
                          {box.label}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            box.confidence > 95
                              ? 'bg-emerald-100 text-emerald-800'
                              : box.confidence > 90
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {box.confidence}% conf
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        {!isEditing ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartEdit(box.fieldKey, box.text);
                            }}
                            className="text-blue-700 hover:text-blue-900 p-1 rounded hover:bg-blue-50 text-xs flex items-center gap-1"
                            title="Edit or correct field"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                        ) : (
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSaveEdit(box.fieldKey);
                              }}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white p-1 rounded text-xs"
                              title="Save Correction"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingField(null);
                              }}
                              className="bg-slate-200 hover:bg-slate-300 text-slate-700 p-1 rounded text-xs"
                              title="Cancel"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Field Value Display / Edit input */}
                    <div className="mt-2">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-full text-xs font-semibold p-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                          autoFocus
                        />
                      ) : (
                        <div className="text-xs font-medium text-slate-900 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          {box.text}
                        </div>
                      )}
                    </div>

                    {/* Mismatch Warning Alert if flagged */}
                    {box.isFlagged && (
                      <div className="mt-2.5 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-900 text-xs flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-[11px]">Officer Advisory Flag</div>
                          <div className="text-[11px] text-red-700 leading-snug">
                            {box.mismatchReason}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 2: Flagged Observations List */}
          {activeTab === 'ANOMALIES' && (
            <div className="space-y-3">
              {currentRecord.anomalies.map(anomaly => (
                <div
                  key={anomaly.id}
                  className="bg-white rounded-xl border border-red-200 p-4 space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded border border-red-200">
                      {anomaly.title}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {anomaly.detectedAt}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {anomaly.description}
                  </p>

                  <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
                    <strong className="text-slate-800">Identified Statutory Reference:</strong>{' '}
                    {anomaly.statutoryReference}
                  </div>

                  <div className="text-[11px] text-blue-900 bg-blue-50 p-2 rounded border border-blue-200">
                    <strong className="text-blue-950">Recommended Officer Action:</strong>{' '}
                    {anomaly.officerAdvisoryNote}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">
                      Status:{' '}
                      <strong className="text-red-700 uppercase">{anomaly.status}</strong>
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => resolveAnomaly(anomaly.id, 'INVESTIGATING')}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded text-[11px] font-semibold transition"
                      >
                        Order Spot Inquiry
                      </button>
                      <button
                        onClick={() => resolveAnomaly(anomaly.id, 'DISMISSED')}
                        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded text-[11px] font-semibold transition"
                      >
                        Mark Verified
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Statutory Action Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Revenue Officer Adjudication Actions ({officerPersona.replace('_', ' ')})
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => setCurrentScreen('CROSS_VERIFICATION')}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold py-2.5 px-3 rounded-lg shadow-xs transition flex items-center justify-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Run Cross-Registry Risk Radar</span>
              </button>

              <button
                onClick={() => setCurrentScreen('GIS_EXPLORER')}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-semibold py-2.5 px-3 rounded-lg transition flex items-center justify-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-blue-700" />
                <span>Verify Cadastral Boundary (GIS)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

