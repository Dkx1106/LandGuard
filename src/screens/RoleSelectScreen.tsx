import React, { useState } from 'react';
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
  Scale,
  LogIn,
  KeyRound,
  Building2,
  Smartphone,
  Fingerprint,
  Sparkles
} from 'lucide-react';

export const RoleSelectScreen: React.FC = () => {
  const {
    userRole,
    setUserRole,
    officerPersona,
    setOfficerPersona,
    setCurrentScreen,
    addAuditLog
  } = useApp();

  const [activeTab, setActiveTab] = useState<UserRole>('REVENUE_OFFICER');
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState<string | null>(null);

  // Officer Form Inputs
  const [officerId, setOfficerId] = useState('RO-UP-LKO-492');
  const [officerPin, setOfficerPin] = useState('••••••');

  // DEO Form Inputs
  const [deoId, setDeoId] = useState('DEO-SAROJINI-409');
  const [deoStation, setDeoStation] = useState('Tehsil Sarojini Nagar Center #2');

  // Citizen Form Inputs
  const [citizenMobile, setCitizenMobile] = useState('+91 98765 43210');
  const [citizenOtp, setCitizenOtp] = useState('849201');

  // Admin Form Inputs
  const [adminId, setAdminId] = useState('ADMIN-NIC-UP-01');

  const executeLogin = (role: UserRole, targetScreen: any, designation?: OfficerPersona) => {
    setLoggingIn(true);
    setLoginSuccessMessage(null);

    setTimeout(() => {
      setUserRole(role);
      if (designation) {
        setOfficerPersona(designation);
      }

      addAuditLog({
        operatorName:
          role === 'REVENUE_OFFICER'
            ? `Rajeev Srivastava (${designation || officerPersona})`
            : role === 'DATA_ENTRY_OPERATOR'
            ? 'Sunil Sharma (DEO-409)'
            : role === 'CITIZEN'
            ? 'Rajesh Kumar (Citizen Buyer)'
            : 'NIC Coordinator (State Admin)',
        operatorRole: role,
        action: `User Authenticated & Session Initialized`,
        khasraNumber: '142/3',
        details: `Authenticated via Jan Parichay / SSO token with ${role} permissions.`,
        verificationBadge: 'SSO Authenticated'
      });

      setLoggingIn(false);
      setLoginSuccessMessage(`Authentication successful! Redirecting to ${role.replace('_', ' ')} workspace...`);

      setTimeout(() => {
        setCurrentScreen(targetScreen);
      }, 700);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Gov-Tech Portal Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-900 text-xs px-3 py-1 rounded-full font-bold">
          <Lock className="w-3.5 h-3.5 text-blue-800" />
          <span>National Single Sign-On (SSO) & Parichay Bridge</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          LandSure AI — Role Selection Login Portal
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Sign in using your statutory government credentials, department employee token, or Citizen Mobile OTP to access appropriate authorization levels.
        </p>
      </div>

      {/* Main Login Card with Role Selector Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
        {/* Top Role Selector Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 grid grid-cols-2 md:grid-cols-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('REVENUE_OFFICER')}
            className={`py-3.5 px-4 text-center border-b-2 transition flex items-center justify-center gap-2 ${
              activeTab === 'REVENUE_OFFICER'
                ? 'border-blue-900 bg-white text-blue-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Scale className="w-4 h-4 text-blue-900" />
            <span>1. Revenue Officer</span>
          </button>

          <button
            onClick={() => setActiveTab('DATA_ENTRY_OPERATOR')}
            className={`py-3.5 px-4 text-center border-b-2 transition flex items-center justify-center gap-2 ${
              activeTab === 'DATA_ENTRY_OPERATOR'
                ? 'border-emerald-700 bg-white text-emerald-800 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileCheck className="w-4 h-4 text-emerald-700" />
            <span>2. Data Entry (DEO)</span>
          </button>

          <button
            onClick={() => setActiveTab('CITIZEN')}
            className={`py-3.5 px-4 text-center border-b-2 transition flex items-center justify-center gap-2 ${
              activeTab === 'CITIZEN'
                ? 'border-amber-600 bg-white text-amber-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Search className="w-4 h-4 text-amber-700" />
            <span>3. Citizen / Buyer</span>
          </button>

          <button
            onClick={() => setActiveTab('ADMIN')}
            className={`py-3.5 px-4 text-center border-b-2 transition flex items-center justify-center gap-2 ${
              activeTab === 'ADMIN'
                ? 'border-slate-900 bg-white text-slate-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4 text-slate-800" />
            <span>4. State Admin</span>
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="p-6 sm:p-8">
          {/* Feedback message banner if logging in */}
          {loginSuccessMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-fade-in">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{loginSuccessMessage}</span>
            </div>
          )}

          {/* TAB 1: REVENUE OFFICER LOGIN */}
          {activeTab === 'REVENUE_OFFICER' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Revenue Officer Adjudication Login
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    For Sub-Registrars, Tehsildars, and Kanungos adjudicating land title registrations and mutation.
                  </p>
                </div>

                {/* Designation / Persona Selector */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase">
                    Select Contextual Designation:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'SUB_REGISTRAR', label: 'Sub-Registrar', desc: 'Deed Registration' },
                      { id: 'TEHSILDAR', label: 'Tehsildar', desc: 'Mutation (Dakhil-Kharij)' },
                      { id: 'KANUNGO', label: 'Revenue Inspector', desc: 'Field Demarcation' }
                    ].map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setOfficerPersona(p.id as OfficerPersona)}
                        className={`p-2 rounded-lg border text-left text-xs transition ${
                          officerPersona === p.id
                            ? 'bg-blue-50 border-blue-900 text-blue-900 font-bold ring-1 ring-blue-500/20'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="text-[11px]">{p.label}</div>
                        <div className="text-[9px] text-slate-400">{p.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulated Credentials Form */}
                <div className="space-y-3 pt-2 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Officer Service ID / e-Pramaan Code
                    </label>
                    <input
                      type="text"
                      value={officerId}
                      onChange={(e) => setOfficerId(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg font-mono font-semibold text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Security Token / Digital Signature PIN
                    </label>
                    <input
                      type="password"
                      value={officerPin}
                      onChange={(e) => setOfficerPin(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg font-mono text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => executeLogin('REVENUE_OFFICER', 'DASHBOARD', officerPersona)}
                    disabled={loggingIn}
                    className="w-full inline-flex items-center justify-center space-x-2 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs py-3 px-4 rounded-lg shadow-sm transition"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>
                      {loggingIn ? 'Authenticating with Parichay...' : `Sign In as Revenue Officer (${officerPersona.replace('_', ' ')})`}
                    </span>
                  </button>
                </div>
              </div>

              {/* Right: Info & Permissions Badge */}
              <div className="lg:col-span-5 bg-blue-50/60 rounded-xl border border-blue-200 p-5 space-y-3 text-xs">
                <div className="font-bold text-blue-950 uppercase tracking-wide flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-blue-900" />
                  <span>Officer Statutory Permissions</span>
                </div>
                <ul className="space-y-2 text-slate-600 text-[11px]">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-900 shrink-0 mt-0.5" />
                    <span>Adjudicate Deed Verification Workspace & Anomaly Flags</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-900 shrink-0 mt-0.5" />
                    <span>Run Multi-Registry Pre-Transaction Cross-Checks (e-Courts & CERSAI)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-900 shrink-0 mt-0.5" />
                    <span>Order Field Demarcation (Seemankan) under Section 24</span>
                  </li>
                </ul>
                <div className="pt-2 border-t border-blue-200 text-[10px] text-blue-800 font-mono">
                  Jurisdiction: Circle IV, Sarojini Nagar Tehsil, Lucknow
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DATA ENTRY OPERATOR LOGIN */}
          {activeTab === 'DATA_ENTRY_OPERATOR' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Data Entry Operator (DEO) Ingestion Login
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Tehsil Digitization Center operator for batch deed scanning, bilateral filters, and OCR layout checks.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Operator Badge / Terminal ID
                    </label>
                    <input
                      type="text"
                      value={deoId}
                      onChange={(e) => setDeoId(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg font-mono font-semibold text-slate-800 bg-slate-50 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Assigned Tehsil Scanning Center
                    </label>
                    <input
                      type="text"
                      value={deoStation}
                      onChange={(e) => setDeoStation(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => executeLogin('DATA_ENTRY_OPERATOR', 'UPLOAD_PIPELINE')}
                    disabled={loggingIn}
                    className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs py-3 px-4 rounded-lg shadow-sm transition"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>
                      {loggingIn ? 'Authenticating Operator Session...' : 'Sign In as Data Entry Operator'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Right: DEO Scope */}
              <div className="lg:col-span-5 bg-emerald-50/60 rounded-xl border border-emerald-200 p-5 space-y-3 text-xs">
                <div className="font-bold text-emerald-950 uppercase tracking-wide flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-emerald-700" />
                  <span>DEO Operational Scope</span>
                </div>
                <ul className="space-y-2 text-slate-600 text-[11px]">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Upload 600 DPI Deeds, 7-12 extracts & RoR</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Review Indic OCR Bounding Box boundaries & transcriptions</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Forward sanitized records to Revenue Officer Adjudication Queue</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: CITIZEN LOGIN */}
          {activeTab === 'CITIZEN' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Citizen / Land Buyer Verification Portal
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Verify land title authenticity, check bank encumbrances, and generate official Land Health Certificates.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Citizen Mobile Number (Aadhaar Linked)
                    </label>
                    <div className="relative">
                      <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={citizenMobile}
                        onChange={(e) => setCitizenMobile(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg font-mono font-semibold text-slate-800 bg-slate-50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      6-Digit Mobile Verification OTP (Demo Pre-filled)
                    </label>
                    <input
                      type="text"
                      value={citizenOtp}
                      onChange={(e) => setCitizenOtp(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg font-mono font-bold tracking-widest text-slate-800 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => executeLogin('CITIZEN', 'CITIZEN_PORTAL')}
                    disabled={loggingIn}
                    className="w-full inline-flex items-center justify-center space-x-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs py-3 px-4 rounded-lg shadow-sm transition"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>
                      {loggingIn ? 'Verifying OTP...' : 'Sign In as Citizen Buyer'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Right: Citizen Benefits */}
              <div className="lg:col-span-5 bg-amber-50/60 rounded-xl border border-amber-200 p-5 space-y-3 text-xs">
                <div className="font-bold text-amber-950 uppercase tracking-wide flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-amber-700" />
                  <span>Citizen Protection Features</span>
                </div>
                <ul className="space-y-2 text-slate-600 text-[11px]">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                    <span>"Verify Before You Buy" public title clearance search</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                    <span>Downloadable Official Land Health Certificate with QR seal</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                    <span>Instant warnings for active bank mortgages & pending court stays</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: STATE ADMIN LOGIN */}
          {activeTab === 'ADMIN' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    State Registry Administrator Login
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    For State Directorate of Land Records & National Informatics Centre (NIC) coordinators.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      NIC Administrative Token
                    </label>
                    <input
                      type="text"
                      value={adminId}
                      onChange={(e) => setAdminId(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg font-mono font-semibold text-slate-800 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => executeLogin('ADMIN', 'DASHBOARD')}
                    disabled={loggingIn}
                    className="w-full inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-4 rounded-lg shadow-sm transition"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>
                      {loggingIn ? 'Validating Root Privileges...' : 'Sign In as System Administrator'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Right: Admin Features */}
              <div className="lg:col-span-5 bg-slate-100 rounded-xl border border-slate-200 p-5 space-y-3 text-xs">
                <div className="font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-slate-800" />
                  <span>Administrative Oversight</span>
                </div>
                <ul className="space-y-2 text-slate-600 text-[11px]">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-slate-800 shrink-0 mt-0.5" />
                    <span>District-wise discrepancy index across all 75 UP Districts</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-slate-800 shrink-0 mt-0.5" />
                    <span>Tamper-evident SHA-256 cryptographic audit logs inspection</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-slate-800 shrink-0 mt-0.5" />
                    <span>Indic ML model telemetry & layout analysis drift monitoring</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Quick Demo 1-Click Login Bar for SIH 2026 Judges */}
        <div className="bg-slate-100/90 border-t border-slate-200 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-slate-800">
                Hackathon Presentation Fast-Logins (1-Click Switch):
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => executeLogin('REVENUE_OFFICER', 'DASHBOARD', 'SUB_REGISTRAR')}
                className="bg-white hover:bg-blue-50 border border-slate-300 text-blue-950 font-bold px-2.5 py-1.5 rounded-lg text-[11px] transition shadow-2xs"
              >
                RO (Sub-Registrar)
              </button>
              <button
                onClick={() => executeLogin('REVENUE_OFFICER', 'DASHBOARD', 'TEHSILDAR')}
                className="bg-white hover:bg-blue-50 border border-slate-300 text-blue-950 font-bold px-2.5 py-1.5 rounded-lg text-[11px] transition shadow-2xs"
              >
                RO (Tehsildar)
              </button>
              <button
                onClick={() => executeLogin('DATA_ENTRY_OPERATOR', 'UPLOAD_PIPELINE')}
                className="bg-white hover:bg-emerald-50 border border-slate-300 text-emerald-950 font-bold px-2.5 py-1.5 rounded-lg text-[11px] transition shadow-2xs"
              >
                Operator (DEO)
              </button>
              <button
                onClick={() => executeLogin('CITIZEN', 'CITIZEN_PORTAL')}
                className="bg-white hover:bg-amber-50 border border-slate-300 text-amber-950 font-bold px-2.5 py-1.5 rounded-lg text-[11px] transition shadow-2xs"
              >
                Citizen Buyer
              </button>
              <button
                onClick={() => executeLogin('ADMIN', 'DASHBOARD')}
                className="bg-white hover:bg-slate-200 border border-slate-300 text-slate-900 font-bold px-2.5 py-1.5 rounded-lg text-[11px] transition shadow-2xs"
              >
                Super Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
