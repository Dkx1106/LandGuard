import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole, OfficerPersona, Screen } from '../types';
import {
  Shield,
  Bell,
  CheckCircle2,
  ChevronDown,
  Layers,
  FileText,
  Search,
  AlertTriangle,
  History,
  Brain,
  MapPin,
  Menu,
  X,
  Building2,
  UserCheck,
  LogIn,
  User
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentScreen,
    setCurrentScreen,
    userRole,
    setUserRole,
    officerPersona,
    setOfficerPersona,
    notifications,
    setIsNotifDrawerOpen
  } = useApp();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleRoleChange = (newRole: UserRole) => {
    setUserRole(newRole);
    setRoleDropdownOpen(false);
    if (newRole === 'CITIZEN') {
      setCurrentScreen('CITIZEN_PORTAL');
    } else if (newRole === 'DATA_ENTRY_OPERATOR') {
      setCurrentScreen('UPLOAD_PIPELINE');
    } else if (newRole === 'ADMIN') {
      setCurrentScreen('DASHBOARD');
    } else {
      setCurrentScreen('DASHBOARD');
    }
  };

  const navItems: { id: Screen; label: string; icon: React.ReactNode; roles?: UserRole[] }[] = [
    { id: 'LANDING', label: 'Home', icon: <Building2 className="w-4 h-4" /> },
    { id: 'ROLE_SELECT', label: 'Role Login', icon: <LogIn className="w-4 h-4 text-emerald-600" /> },
    { id: 'DASHBOARD', label: 'Dashboard', icon: <Layers className="w-4 h-4" />, roles: ['ADMIN', 'REVENUE_OFFICER'] },
    { id: 'UPLOAD_PIPELINE', label: 'Upload & AI Ingest', icon: <FileText className="w-4 h-4" />, roles: ['DATA_ENTRY_OPERATOR', 'ADMIN', 'REVENUE_OFFICER'] },
    { id: 'DOC_VERIFICATION', label: 'Doc Workspace', icon: <FileText className="w-4 h-4" />, roles: ['DATA_ENTRY_OPERATOR', 'REVENUE_OFFICER', 'ADMIN'] },
    { id: 'QUEUE', label: 'Verification Queue', icon: <AlertTriangle className="w-4 h-4" />, roles: ['REVENUE_OFFICER', 'ADMIN'] },
    { id: 'CROSS_VERIFICATION', label: 'Risk Advisory', icon: <Shield className="w-4 h-4" />, roles: ['REVENUE_OFFICER', 'ADMIN'] },
    { id: 'RECORD_COMPARISON', label: 'What Changed?', icon: <History className="w-4 h-4" />, roles: ['REVENUE_OFFICER', 'ADMIN', 'DATA_ENTRY_OPERATOR'] },
    { id: 'GIS_EXPLORER', label: 'Cadastral GIS', icon: <MapPin className="w-4 h-4" /> },
    { id: 'DUPLICATE_DETECTION', label: 'Duplicate Check', icon: <Search className="w-4 h-4" />, roles: ['REVENUE_OFFICER', 'ADMIN'] },
    { id: 'CITIZEN_PORTAL', label: 'Citizen Verify', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'AI_TRACE', label: 'AI Trace & Laws', icon: <Brain className="w-4 h-4" />, roles: ['REVENUE_OFFICER', 'ADMIN'] },
    { id: 'AUDIT_TRAIL', label: 'Audit Trail', icon: <History className="w-4 h-4" />, roles: ['ADMIN', 'REVENUE_OFFICER'] }
  ];

  const visibleNavItems = navItems.filter(
    item => !item.roles || item.roles.includes(userRole)
  );

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Gov Strip */}
      <div className="bg-[#0b192c] text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between border-b border-blue-900/60 font-sans">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold tracking-wide text-slate-200">
              NATIONAL LAND RECORDS MODERNIZATION PROGRAMME (NLRMP)
            </span>
          </div>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-amber-300 font-medium">
            Smart India Hackathon 2026 Initiative
          </span>
        </div>
        <div className="flex items-center space-x-3 text-slate-300">
          <span className="hidden sm:inline bg-slate-800/80 px-2 py-0.5 rounded text-[11px] border border-slate-700">
            Node: Lucknow Division (Circle IV)
          </span>
          <span className="text-emerald-400 text-[11px] font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> AI Advisory Grid Online
          </span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer select-none"
            onClick={() => setCurrentScreen('LANDING')}
          >
            <div className="w-10 h-10 rounded-lg bg-[#0b192c] flex items-center justify-center shadow-md border border-slate-700">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  LandSure <span className="text-emerald-600">AI</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded border border-blue-200">
                  SIH 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-none mt-0.5">
                AI-Assisted Land Record Validation & Risk Advisory
              </p>
            </div>
          </div>

          {/* Right Header Actions: Dedicated Login Button + Role Switcher */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Dedicated Login Section Button */}
            <button
              onClick={() => setCurrentScreen('ROLE_SELECT')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                currentScreen === 'ROLE_SELECT'
                  ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}
            >
              <LogIn className="w-3.5 h-3.5 text-emerald-700" />
              <span>Login / अधिकारी लॉगिन</span>
            </button>

            {/* Primary Role Selector */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 transition"
              >
                <span className="text-slate-500 font-normal">Active Role:</span>
                <span className="text-blue-900 uppercase">{userRole.replace('_', ' ')}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-50">
                  <div className="px-3 py-2 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase">
                    Switch Active Persona
                  </div>
                  <button
                    onClick={() => handleRoleChange('REVENUE_OFFICER')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 ${
                      userRole === 'REVENUE_OFFICER' ? 'bg-blue-50 font-bold text-blue-900' : 'text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">Revenue Officer</div>
                      <div className="text-[10px] text-slate-500">Sub-Registrar / Tehsildar Adjudication</div>
                    </div>
                    {userRole === 'REVENUE_OFFICER' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </button>

                  <button
                    onClick={() => handleRoleChange('DATA_ENTRY_OPERATOR')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 ${
                      userRole === 'DATA_ENTRY_OPERATOR' ? 'bg-blue-50 font-bold text-blue-900' : 'text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">Data Entry Operator (DEO)</div>
                      <div className="text-[10px] text-slate-500">Document Ingestion & OCR Bounding Box QA</div>
                    </div>
                    {userRole === 'DATA_ENTRY_OPERATOR' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </button>

                  <button
                    onClick={() => handleRoleChange('CITIZEN')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 ${
                      userRole === 'CITIZEN' ? 'bg-blue-50 font-bold text-blue-900' : 'text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">Citizen / Land Buyer</div>
                      <div className="text-[10px] text-slate-500">Public Title Verification & Certificate</div>
                    </div>
                    {userRole === 'CITIZEN' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </button>

                  <button
                    onClick={() => handleRoleChange('ADMIN')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 ${
                      userRole === 'ADMIN' ? 'bg-blue-50 font-bold text-blue-900' : 'text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">System Administrator</div>
                      <div className="text-[10px] text-slate-500">State Metrics & Audit Ledger</div>
                    </div>
                    {userRole === 'ADMIN' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </button>

                  <div className="p-2 border-t border-slate-100 bg-slate-50">
                    <button
                      onClick={() => {
                        setRoleDropdownOpen(false);
                        setCurrentScreen('ROLE_SELECT');
                      }}
                      className="w-full py-1.5 bg-blue-900 text-white rounded text-[11px] font-bold text-center hover:bg-blue-800"
                    >
                      Open Full Login Portal
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Contextual Officer Persona Switcher (Only visible when Revenue Officer) */}
            {userRole === 'REVENUE_OFFICER' && (
              <div className="flex items-center bg-blue-50 border border-blue-200 rounded-lg p-0.5 text-xs">
                <span className="px-2 text-[10px] text-blue-700 font-medium">Designation:</span>
                {(['SUB_REGISTRAR', 'TEHSILDAR', 'KANUNGO'] as OfficerPersona[]).map(persona => (
                  <button
                    key={persona}
                    onClick={() => setOfficerPersona(persona)}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition ${
                      officerPersona === persona
                        ? 'bg-blue-900 text-white shadow-xs'
                        : 'text-blue-800 hover:bg-blue-100'
                    }`}
                  >
                    {persona.replace('_', ' ')}
                  </button>
                ))}
              </div>
            )}

            {/* Notifications Button */}
            <button
              onClick={() => setIsNotifDrawerOpen(true)}
              className="relative p-2 text-slate-600 hover:text-blue-900 hover:bg-slate-100 rounded-lg transition"
              title="Real-Time Alerts"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setCurrentScreen('ROLE_SELECT')}
              className="px-2.5 py-1 text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-md"
            >
              Login
            </button>
            <button
              onClick={() => setIsNotifDrawerOpen(true)}
              className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setNavMenuOpen(!navMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              {navMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Primary Navigation Strip */}
      <nav className="border-t border-slate-200 bg-slate-50/80 px-4 sm:px-6 lg:px-8 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex space-x-1 py-1.5">
          {visibleNavItems.map(item => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {navMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
          <div className="py-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase">Login / Switch Role</span>
            <div className="grid grid-cols-2 gap-1.5 mt-1.5">
              {(['REVENUE_OFFICER', 'DATA_ENTRY_OPERATOR', 'CITIZEN', 'ADMIN'] as UserRole[]).map(r => (
                <button
                  key={r}
                  onClick={() => {
                    handleRoleChange(r);
                    setNavMenuOpen(false);
                  }}
                  className={`px-2.5 py-1.5 text-xs rounded border text-left ${
                    userRole === r
                      ? 'bg-blue-900 text-white border-blue-900 font-semibold'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  {r.replace('_', ' ')}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setCurrentScreen('ROLE_SELECT');
                setNavMenuOpen(false);
              }}
              className="mt-2 w-full py-1.5 bg-blue-900 text-white rounded text-xs font-bold text-center"
            >
              Open Full Role Login Portal
            </button>
          </div>
          <div className="space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentScreen(item.id);
                  setNavMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded text-xs font-medium text-left ${
                  currentScreen === item.id ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-700'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
