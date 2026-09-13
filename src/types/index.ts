export type Screen =
  | 'LANDING'
  | 'ROLE_SELECT'
  | 'DASHBOARD'
  | 'UPLOAD_PIPELINE'
  | 'DOC_VERIFICATION'
  | 'QUEUE'
  | 'CROSS_VERIFICATION'
  | 'DUPLICATE_DETECTION'
  | 'GIS_EXPLORER'
  | 'CITIZEN_PORTAL'
  | 'RECORD_COMPARISON'
  | 'AUDIT_TRAIL'
  | 'AI_TRACE';

export type UserRole = 'ADMIN' | 'REVENUE_OFFICER' | 'DATA_ENTRY_OPERATOR' | 'CITIZEN';

export type OfficerPersona = 'SUB_REGISTRAR' | 'TEHSILDAR' | 'KANUNGO';

export type RecordStatus = 'VERIFIED' | 'UNDER_REVIEW' | 'FLAGGED_ANOMALY' | 'DISPUTED';

export type AnomalySeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type AnomalyType =
  | 'OWNERSHIP_MISMATCH'
  | 'AREA_DISCREPANCY'
  | 'POTENTIAL_DUPLICATE'
  | 'ENCUMBRANCE_ALERT'
  | 'COURT_STAY_NOTICE'
  | 'BOUNDARY_OVERLAP';

export interface BoundingBox {
  id: string;
  label: string;
  text: string;
  confidence: number;
  box: { x: number; y: number; width: number; height: number }; // percentages 0-100
  fieldKey: string;
  isFlagged?: boolean;
  mismatchReason?: string;
  category: 'header' | 'parties' | 'property' | 'consideration' | 'boundaries' | 'signatures';
}

export interface AnomalyItem {
  id: string;
  type: AnomalyType;
  title: string;
  description: string;
  severity: AnomalySeverity;
  sourceDatabases: string[];
  statutoryReference: string;
  officerAdvisoryNote: string;
  status: 'FLAGGED' | 'INVESTIGATING' | 'DISMISSED' | 'CONFIRMED';
  detectedAt: string;
}

export interface BoundaryDetail {
  north: string;
  south: string;
  east: string;
  west: string;
}

export interface LandRecord {
  id: string;
  khasraNumber: string;
  khataNumber: string;
  village: string;
  tehsil: string;
  district: string;
  state: string;
  ownerName: string;
  fatherName: string;
  coOwners: string[];
  areaAcres: number;
  areaHectares: number;
  landType: 'Agricultural' | 'Residential' | 'Commercial' | 'Government Nazul';
  deedRegistrationNo: string;
  deedDate: string;
  claimedAreaAcres: number;
  considerationAmount: string;
  stampDutyPaid: string;
  status: RecordStatus;
  riskScore: number; // 0 - 100 (higher = more risk indicators for officer)
  confidenceScore: number; // 0 - 100
  encumbrance: {
    hasActiveMortgage: boolean;
    bankName?: string;
    amount?: string;
    cersaiRef?: string;
    statusDate?: string;
  };
  litigation: {
    hasStayOrder: boolean;
    courtName?: string;
    caseNumber?: string;
    bench?: string;
    stayDetails?: string;
  };
  boundaries: BoundaryDetail;
  coordinates: { lat: number; lng: number };
  boundingBoxes: BoundingBox[];
  anomalies: AnomalyItem[];
  history: HistoricalRecord;
}

export interface HistoricalRecord {
  lastRecordedYear: string;
  fasliYear: string;
  recordedOwners: string[];
  recordedAreaAcres: number;
  recordedKhasra: string;
  boundaries: BoundaryDetail;
  sourceDoc: string;
  changesIdentified: {
    field: string;
    historicalVal: string;
    currentVal: string;
    changeType: 'MODIFIED' | 'ADDED' | 'REMOVED';
    advisoryNote: string;
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'ALERT' | 'INFO' | 'SUCCESS' | 'WARNING';
  read: boolean;
  recordKhasra?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  operatorName: string;
  operatorRole: string;
  action: string;
  khasraNumber: string;
  details: string;
  sha256Hash: string;
  verificationBadge: string;
}

export interface CadastralParcel {
  khasra: string;
  owner: string;
  areaAcres: number;
  status: 'CLEAN' | 'WARNING' | 'CRITICAL' | 'GOV_LAND';
  polygon: [number, number][]; // relative coordinates for SVG
  center: [number, number];
  encroachmentDetected?: boolean;
  encroachmentDetails?: string;
  subDivision?: string;
}

