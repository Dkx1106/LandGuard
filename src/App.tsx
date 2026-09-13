import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { StatutoryDisclaimerBanner } from './components/StatutoryDisclaimerBanner';
import { NotificationDrawer } from './components/NotificationDrawer';
import { LandingScreen } from './screens/LandingScreen';
import { RoleSelectScreen } from './screens/RoleSelectScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { UploadPipelineScreen } from './screens/UploadPipelineScreen';
import { DocVerificationScreen } from './screens/DocVerificationScreen';
import { QueueScreen } from './screens/QueueScreen';
import { CrossVerificationScreen } from './screens/CrossVerificationScreen';
import { DuplicateDetectionScreen } from './screens/DuplicateDetectionScreen';
import { GisExplorerScreen } from './screens/GisExplorerScreen';
import { CitizenPortalScreen } from './screens/CitizenPortalScreen';
import { RecordComparisonScreen } from './screens/RecordComparisonScreen';
import { AuditTrailScreen } from './screens/AuditTrailScreen';
import { AiDecisionTraceScreen } from './screens/AiDecisionTraceScreen';
import {
  Compass,
  Layers,
  Sparkles,
  ShieldCheck,
  ChevronUp,
  ChevronDown,
  X
} from 'lucide-react';
import { Screen } from './types';

export const App: React.FC = () => {
  const { currentScreen, setCurrentScreen, userRole } = useApp();
  const [quickBarOpen, setQuickBarOpen] = useState(true);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'LANDING':
        return <LandingScreen />;
      case 'ROLE_SELECT':
        return <RoleSelectScreen />;
      case 'DASHBOARD':
        return <DashboardScreen />;
      case 'UPLOAD_PIPELINE':
        return <UploadPipelineScreen />;
      case 'DOC_VERIFICATION':
        return <DocVerificationScreen />;
      case 'QUEUE':
        return <QueueScreen />;
      case 'CROSS_VERIFICATION':
        return <CrossVerificationScreen />;
      case 'DUPLICATE_DETECTION':
        return <DuplicateDetectionScreen />;
      case 'GIS_EXPLORER':
        return <GisExplorerScreen />;
      case 'CITIZEN_PORTAL':
        return <CitizenPortalScreen />;
      case 'RECORD_COMPARISON':
        return <RecordComparisonScreen />;
      case 'AUDIT_TRAIL':
        return <AuditTrailScreen />;
      case 'AI_TRACE':
        return <AiDecisionTraceScreen />;
      default:
        return <LandingScreen />;
    }
  };

  const allScreens: { id: Screen; label: string; num: string }[] = [
    { id: 'LANDING', label: '1. Landing Page', num: '01' },
    { id: 'ROLE_SELECT', label: '2. Role Selection Login', num: '02' },
    { id: 'DASHBOARD', label: '3. RO / Admin Dashboard', num: '03' },
    { id: 'UPLOAD_PIPELINE', label: '4. Upload & AI Ingest', num: '04' },
    { id: 'DOC_VERIFICATION', label: '5. Doc Workspace (Split)', num: '05' },
    { id: 'QUEUE', label: '6. Triage Queue', num: '06' },
    { id: 'CROSS_VERIFICATION', label: '7. Risk Advisory', num: '07' },
    { id: 'DUPLICATE_DETECTION', label: '8. Duplicate Check', num: '08' },
    { id: 'GIS_EXPLORER', label: '9. Cadastral GIS', num: '09' },
    { id: 'CITIZEN_PORTAL', label: '10. Citizen Verify', num: '10' },
    { id: 'RECORD_COMPARISON', label: '11. What Changed? Diff', num: '11' },
    { id: 'AUDIT_TRAIL', label: '12. Audit Trail', num: '12' },
    { id: 'AI_TRACE', label: '13. AI Trace & Laws', num: '13' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] font-sans antialiased text-slate-800">
      <Header />
      <StatutoryDisclaimerBanner />
      <NotificationDrawer />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderScreen()}
      </main>

      {/* Floating Presentation Navigator for SIH 2026 Evaluators */}
      <div className="fixed bottom-3 right-3 z-50 no-print">
        <div className="bg-[#0b192c] text-white rounded-xl shadow-2xl border border-slate-700 overflow-hidden text-xs max-w-xs sm:max-w-md">
          <div className="px-3 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-bold text-[11px] tracking-wide text-slate-200">
                SIH 2026 Screen Navigator (13 Screens)
              </span>
            </div>
            <button
              onClick={() => setQuickBarOpen(!quickBarOpen)}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
              title={quickBarOpen ? 'Collapse Navigator' : 'Expand Navigator'}
            >
              {quickBarOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>
          </div>

          {quickBarOpen && (
            <div className="p-2.5 max-h-56 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-1.5 bg-[#0b192c]/95">
              {allScreens.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentScreen(s.id)}
                  className={`px-2 py-1.5 rounded text-left text-[11px] font-medium transition line-clamp-1 ${
                    currentScreen === s.id
                      ? 'bg-emerald-600 text-white font-bold shadow-xs'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Official Gov-Tech Footer */}
      <footer className="bg-[#0b192c] text-slate-400 text-xs border-t border-slate-800 mt-auto no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-blue-900/60 border border-blue-700 flex items-center justify-center font-bold text-emerald-400">
                LS
              </div>
              <div>
                <span className="text-white font-bold tracking-tight text-sm">
                  LandSure AI &bull; Smart India Hackathon 2026
                </span>
                <p className="text-[11px] text-slate-500">
                  Revenue Record Digitization, BhuNaksha Spatial Verification & Pre-Transaction Risk Advisory
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[11px]">
              <span className="text-slate-500">Aligned With:</span>
              <span className="text-slate-300">Digital India Land Records Modernization Programme (DILRMP)</span>
              <span className="text-slate-500">&bull;</span>
              <span className="text-slate-300">UP Bhulekh / BhuNaksha</span>
              <span className="text-slate-500">&bull;</span>
              <span className="text-slate-300">e-Courts NJDG</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 gap-2">
            <div>
              Designed for Revenue Departments, Sub-Registrar Offices & Citizens across India.
            </div>
            <div>
              Statutory determination rests with competent Revenue Courts & Sub-Registrars under UP Revenue Code, 2006.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

