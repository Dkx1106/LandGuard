import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Upload,
  FileText,
  Cpu,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  RotateCcw,
  Sparkles,
  AlertCircle,
  FileCheck
} from 'lucide-react';

export const UploadPipelineScreen: React.FC = () => {
  const {
    startDocProcessingSimulation,
    isProcessingDoc,
    aiProcessingStep,
    setCurrentScreen,
    currentRecord,
    quickNavigateToRecord
  } = useApp();

  const [selectedFileScenario, setSelectedFileScenario] = useState('142/3');

  const steps = [
    {
      num: 1,
      title: 'Bilateral Filtering & Document Deskew',
      desc: 'Gaussian noise reduction, 1.2° tilt correction, and e-Stamp header segmentation.',
      detail: 'Processing OpenCV filter pipeline @ 600 DPI resolution.'
    },
    {
      num: 2,
      title: 'Indic OCR & LayoutLM Analysis',
      desc: 'Multilingual Hindi/English glyph recognition & stamp watermark suppression.',
      detail: 'Identified 7 primary document sections and bounding contours.'
    },
    {
      num: 3,
      title: 'Named Entity Extraction (NER)',
      desc: 'Extracting Khasra, Khatauni Khata, Vendor, Vendee, Claimed Area, Consideration.',
      detail: 'Tagged entities with 92.4% average composite confidence score.'
    },
    {
      num: 4,
      title: 'Multi-Registry Cross-Reconciliation',
      desc: 'Querying UP Bhulekh RoR API, e-Courts National Grid, and CERSAI mortgage registry.',
      detail: '4 independent registry checks executed in 410ms.'
    },
    {
      num: 5,
      title: 'Anomaly Screening & Advisory Formulation',
      desc: 'Compiling advisory indicators and statutory regulatory references for officer review.',
      detail: 'Formulated non-definitive advisory scorecard. Human review required.'
    }
  ];

  const handleRunSimulation = (khasra: string) => {
    setSelectedFileScenario(khasra);
    quickNavigateToRecord(khasra);
    startDocProcessingSimulation(khasra);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-1 rounded w-fit border border-blue-200">
          <Cpu className="w-3.5 h-3.5" />
          <span>Automated Indic AI Ingestion Pipeline</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
          Deed Ingestion & Multilingual AI Extraction
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Upload scanned registered sale deeds, Khatauni extracts, or partition drafts to simulate real-time layout analysis, Indic OCR, and cross-registry screening.
        </p>
      </div>

      {/* Upload Box & Preloaded Test Cases */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Drag & Drop Dropzone (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center hover:border-blue-500 transition space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 text-blue-900 flex items-center justify-center">
            <Upload className="w-8 h-8 text-blue-900" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Upload Scanned Land Document (PDF / TIFF / JPEG)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Supports Bilingual Hindi/English Sale Deeds, Jamabandi, and BhuNaksha extracts.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => handleRunSimulation('142/3')}
              disabled={isProcessingDoc}
              className="inline-flex items-center space-x-2 bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white text-xs font-semibold px-5 py-2.5 rounded-lg shadow-xs transition"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{isProcessingDoc ? 'Processing Pipeline...' : 'Process Scanned Deed'}</span>
            </button>
          </div>

          <div className="pt-2 text-[11px] text-slate-400">
            Secure Gov-Cloud Ingestion &bull; Bilateral Filtering &bull; SHA-256 Checksum Logged
          </div>
        </div>

        {/* Right: Quick Preloaded Test Deeds (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wide">
              Select Pre-Loaded Hackathon Deed
            </h3>
            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-mono">
              Ready-to-Test
            </span>
          </div>

          {/* Test Deed 1 */}
          <div
            onClick={() => handleRunSimulation('142/3')}
            className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
              selectedFileScenario === '142/3'
                ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-500/30'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-900" />
                <span>Deed_Khasra_142_3_Lucknow.pdf</span>
              </div>
              <span className="text-[10px] font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">
                High Risk Case
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1">
              Rajesh Kumar &bull; 1.82 Acres RoR vs 2.10 Claimed &bull; Active SBI Loan & Stay Order
            </p>
          </div>

          {/* Test Deed 2 */}
          <div
            onClick={() => handleRunSimulation('89/1')}
            className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
              selectedFileScenario === '89/1'
                ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-500/30'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-purple-900" />
                <span>Deed_Khasra_89_1_Varanasi.pdf</span>
              </div>
              <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-1.5 py-0.5 rounded">
                Duplicate Alert
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1">
              Virendra Singh &bull; Double-sale attempt detected within 9 months of prior deed
            </p>
          </div>

          {/* Test Deed 3 */}
          <div
            onClick={() => handleRunSimulation('204/A')}
            className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
              selectedFileScenario === '204/A'
                ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-500/30'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-900" />
                <span>Deed_Khasra_204_A_Ayodhya.pdf</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                Clean Title
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1">
              Manish Chaurasia &bull; Commercial plot with 100% boundary concordance & clean lien
            </p>
          </div>
        </div>
      </div>

      {/* Live 5-Stage Pipeline Progress Simulation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Live Indic Processing Pipeline &bull; Current Document: <span className="font-mono text-blue-900">Khasra {currentRecord.khasraNumber} ({currentRecord.village}, {currentRecord.district})</span>
            </h3>
            <p className="text-xs text-slate-500">
              Simulated real-time inference across computer vision, NLP, and state registry bridges.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
              isProcessingDoc
                ? 'bg-amber-100 text-amber-800 animate-pulse'
                : 'bg-emerald-100 text-emerald-800'
            }`}>
              {isProcessingDoc ? (
                <>
                  <Clock className="w-3.5 h-3.5" /> Stage {aiProcessingStep} of 5 In Progress
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" /> Pipeline Ready for Review
                </>
              )}
            </span>
          </div>
        </div>

        {/* 5 Step Progress Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {steps.map(s => {
            const isCompleted = aiProcessingStep >= s.num;
            const isCurrent = aiProcessingStep === s.num && isProcessingDoc;

            return (
              <div
                key={s.num}
                className={`p-3.5 rounded-xl border text-xs transition relative ${
                  isCurrent
                    ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20 shadow-xs'
                    : isCompleted
                    ? 'border-emerald-300 bg-emerald-50/40'
                    : 'border-slate-200 bg-slate-50 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-300 text-slate-700'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Step 0{s.num}
                  </span>
                </div>
                <div className="font-bold text-slate-900 text-[11px]">{s.title}</div>
                <p className="text-[10px] text-slate-500 mt-1 leading-snug">{s.desc}</p>
                <div className="mt-2 text-[9px] font-mono text-slate-400 border-t border-slate-200/50 pt-1">
                  {s.detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Terminal Log Stream */}
        <div className="bg-[#0b192c] text-emerald-400 rounded-xl p-4 font-mono text-xs overflow-x-auto space-y-1">
          <div className="text-slate-400 text-[11px] pb-1 border-b border-slate-800 flex items-center justify-between">
            <span>// Indic AI Pipeline Execution Log — Sub-Registrar Gateway</span>
            <span className="text-slate-500">Node: LKO-SR-4</span>
          </div>
          <div className="pt-2 text-slate-300">[00.12s] Ingested PDF Deed: DEED/2026/LKO/4921 (Checksum: e3b0c44... OK)</div>
          <div className="text-slate-300">[00.45s] Bilateral noise filter executed: 600 DPI, Deskew angle: -1.24 deg.</div>
          <div className="text-slate-300">[01.05s] Indic LayoutLM applied: 7 Bounding Boxes extracted (Composite conf: {currentRecord.confidenceScore}%).</div>
          <div className="text-emerald-400">[01.40s] UP Bhulekh RoR Query: Returned Khatauni #00482 (Recorded Area: 1.82 Acres).</div>
          {currentRecord.claimedAreaAcres !== currentRecord.areaAcres && (
            <div className="text-amber-400">[01.62s] ANOMALY FLAGGED: Claimed Area ({currentRecord.claimedAreaAcres} Acres) != RoR Area ({currentRecord.areaAcres} Acres).</div>
          )}
          {currentRecord.encumbrance.hasActiveMortgage && (
            <div className="text-amber-400">[01.88s] CERSAI Search: Active Security Interest found (SBI Gomti Nagar, ₹35L).</div>
          )}
          {currentRecord.litigation.hasStayOrder && (
            <div className="text-red-400">[02.10s] e-Courts Judicial Match: Civil Suit 2024/491 active injunction against alienation.</div>
          )}
          <div className="text-slate-400 pt-1">[02.40s] AI processing finished. Formulated officer advisory package. Awaiting human adjudication.</div>
        </div>

        {/* Footer CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center space-x-2 text-xs text-slate-600">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>AI outputs are preliminary advisory cues for competent Revenue Officers.</span>
          </div>

          <button
            onClick={() => setCurrentScreen('DOC_VERIFICATION')}
            className="inline-flex items-center justify-center space-x-2 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs px-5 py-2.5 rounded-lg shadow-xs transition"
          >
            <span>Open Document Verification Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

