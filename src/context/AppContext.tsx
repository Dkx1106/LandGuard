import React, { createContext, useContext, useState } from 'react';
import {
  Screen,
  UserRole,
  OfficerPersona,
  LandRecord,
  BoundingBox,
  NotificationItem,
  AuditLogEntry,
  CadastralParcel
} from '../types';
import {
  PRIMARY_RECORD,
  SECONDARY_RECORDS,
  CADASTRAL_PARCELS,
  MOCK_NOTIFICATIONS,
  MOCK_AUDIT_LOGS
} from '../data/mockData';

interface AppContextType {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  officerPersona: OfficerPersona;
  setOfficerPersona: (persona: OfficerPersona) => void;
  currentRecord: LandRecord;
  setCurrentRecord: (record: LandRecord) => void;
  records: LandRecord[];
  activeBBoxId: string | null;
  setActiveBBoxId: (id: string | null) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  isNotifDrawerOpen: boolean;
  setIsNotifDrawerOpen: (open: boolean) => void;
  auditLogs: AuditLogEntry[];
  addAuditLog: (entry: Omit<AuditLogEntry, 'id' | 'timestamp' | 'sha256Hash'>) => void;
  parcels: CadastralParcel[];
  selectedParcelKhasra: string | null;
  setSelectedParcelKhasra: (khasra: string | null) => void;
  aiProcessingStep: number;
  isProcessingDoc: boolean;
  startDocProcessingSimulation: (scenarioId?: string) => void;
  updateRecordField: (fieldKey: string, newValue: any) => void;
  resolveAnomaly: (anomalyId: string, status: 'INVESTIGATING' | 'DISMISSED' | 'CONFIRMED') => void;
  quickNavigateToRecord: (khasra: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('LANDING');
  const [userRole, setUserRole] = useState<UserRole>('REVENUE_OFFICER');
  const [officerPersona, setOfficerPersona] = useState<OfficerPersona>('SUB_REGISTRAR');
  const [records, setRecords] = useState<LandRecord[]>([PRIMARY_RECORD, ...SECONDARY_RECORDS]);
  const [currentRecord, setCurrentRecord] = useState<LandRecord>(PRIMARY_RECORD);
  const [activeBBoxId, setActiveBBoxId] = useState<string | null>('bbox-4');
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(MOCK_AUDIT_LOGS);
  const [parcels] = useState<CadastralParcel[]>(CADASTRAL_PARCELS);
  const [selectedParcelKhasra, setSelectedParcelKhasra] = useState<string | null>('142/3');
  
  // AI Simulation State
  const [isProcessingDoc, setIsProcessingDoc] = useState(false);
  const [aiProcessingStep, setAiProcessingStep] = useState(5);

  const startDocProcessingSimulation = (scenarioId = '142/3') => {
    setIsProcessingDoc(true);
    setAiProcessingStep(1);
    
    // Pick scenario record
    const targetRecord = records.find(r => r.khasraNumber === scenarioId) || PRIMARY_RECORD;
    setCurrentRecord(targetRecord);

    const stepInterval = setInterval(() => {
      setAiProcessingStep((prev) => {
        if (prev >= 5) {
          clearInterval(stepInterval);
          setIsProcessingDoc(false);
          return 5;
        }
        return prev + 1;
      });
    }, 1200);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const addAuditLog = (entry: Omit<AuditLogEntry, 'id' | 'timestamp' | 'sha256Hash'>) => {
    const randomHash = Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');

    const newEntry: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      sha256Hash: randomHash,
      ...entry
    };

    setAuditLogs(prev => [newEntry, ...prev]);
  };

  const updateRecordField = (fieldKey: string, newValue: any) => {
    setCurrentRecord(prev => {
      const updated = { ...prev, [fieldKey]: newValue };
      
      // Also update matching bounding box if exists
      const updatedBoxes = prev.boundingBoxes.map(b => {
        if (b.fieldKey === fieldKey) {
          return { ...b, text: String(newValue), isFlagged: false };
        }
        return b;
      });

      return { ...updated, boundingBoxes: updatedBoxes };
    });

    addAuditLog({
      operatorName: userRole === 'REVENUE_OFFICER' ? `Officer (${officerPersona})` : 'Data Entry Operator',
      operatorRole: userRole,
      action: `Field Value Corrected: ${fieldKey}`,
      khasraNumber: currentRecord.khasraNumber,
      details: `Value modified to "${newValue}" by authorized operator.`,
      verificationBadge: 'Verified Mutation'
    });
  };

  const resolveAnomaly = (anomalyId: string, status: 'INVESTIGATING' | 'DISMISSED' | 'CONFIRMED') => {
    setCurrentRecord(prev => {
      const updatedAnomalies = prev.anomalies.map(a =>
        a.id === anomalyId ? { ...a, status } : a
      );
      return { ...prev, anomalies: updatedAnomalies };
    });

    addAuditLog({
      operatorName: `Officer (${officerPersona})`,
      operatorRole: 'REVENUE_OFFICER',
      action: `Anomaly Triage Update: ${anomalyId}`,
      khasraNumber: currentRecord.khasraNumber,
      details: `Status shifted to ${status} following officer assessment.`,
      verificationBadge: 'Statutory Record'
    });
  };

  const quickNavigateToRecord = (khasra: string) => {
    const found = records.find(r => r.khasraNumber === khasra);
    if (found) {
      setCurrentRecord(found);
      setSelectedParcelKhasra(found.khasraNumber);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        userRole,
        setUserRole,
        officerPersona,
        setOfficerPersona,
        currentRecord,
        setCurrentRecord,
        records,
        activeBBoxId,
        setActiveBBoxId,
        notifications,
        markNotificationAsRead,
        isNotifDrawerOpen,
        setIsNotifDrawerOpen,
        auditLogs,
        addAuditLog,
        parcels,
        selectedParcelKhasra,
        setSelectedParcelKhasra,
        aiProcessingStep,
        isProcessingDoc,
        startDocProcessingSimulation,
        updateRecordField,
        resolveAnomaly,
        quickNavigateToRecord
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

