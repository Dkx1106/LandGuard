import { LandRecord, CadastralParcel, NotificationItem, AuditLogEntry } from '../types';

export const PRIMARY_RECORD: LandRecord = {
  id: 'REC-UP-LKO-2026-1423',
  khasraNumber: '142/3',
  khataNumber: '00482',
  village: 'Rampur',
  tehsil: 'Sarojini Nagar',
  district: 'Lucknow',
  state: 'Uttar Pradesh',
  ownerName: 'Rajesh Kumar',
  fatherName: 'Late Ramcharan',
  coOwners: ['Late Ramcharan (Deceased Co-Sharer, Succession Pending)'],
  areaAcres: 1.82,
  areaHectares: 0.736,
  landType: 'Agricultural',
  deedRegistrationNo: 'DEED/2026/LKO/4921',
  deedDate: '2026-02-14',
  claimedAreaAcres: 2.10,
  considerationAmount: '₹ 84,50,000',
  stampDutyPaid: '₹ 5,91,500 (E-Stamp #IN-UP298492019488)',
  status: 'FLAGGED_ANOMALY',
  riskScore: 74, // High caution for Revenue Officer
  confidenceScore: 92.4,
  encumbrance: {
    hasActiveMortgage: true,
    bankName: 'State Bank of India (Gomti Nagar Branch)',
    amount: '₹ 35,00,000 (Kisan Credit & Term Facility)',
    cersaiRef: 'CERSAI-LKO-2022-094812',
    statusDate: '2022-08-19'
  },
  litigation: {
    hasStayOrder: true,
    courtName: 'Court of Civil Judge (Sr. Div.), Lucknow',
    caseNumber: 'Civil Suit No. 2024/491',
    bench: 'Court Room 4',
    stayDetails: 'Ad-interim injunction restraining alienation or alteration of nature of suit land.'
  },
  boundaries: {
    north: 'PWD Village Link Road (Km 4/2)',
    south: 'Khasra 142/4 (Bhoomi Suresh Verma)',
    east: 'Chak Road & Minor Irrigation Canal',
    west: 'Khasra 141 (Gram Sabha Naveen Parti)'
  },
  coordinates: {
    lat: 26.7489,
    lng: 80.8924
  },
  boundingBoxes: [
    {
      id: 'bbox-1',
      label: 'Deed Header & Stamp',
      text: 'GOVERNMENT OF UTTAR PRADESH e-STAMP CERTIFICATE IN-UP298492019488',
      confidence: 99.1,
      box: { x: 8, y: 4, width: 84, height: 12 },
      fieldKey: 'stampDutyPaid',
      category: 'header'
    },
    {
      id: 'bbox-2',
      label: 'Vendor / First Party',
      text: 'Rajesh Kumar s/o Late Ramcharan, r/o Village Rampur, Lucknow',
      confidence: 96.4,
      box: { x: 10, y: 20, width: 78, height: 10 },
      fieldKey: 'ownerName',
      isFlagged: true,
      mismatchReason: 'Co-sharer succession mutation not recorded in Bhulekh RoR',
      category: 'parties'
    },
    {
      id: 'bbox-3',
      label: 'Khasra / Plot Number',
      text: 'Khasra No. 142/3, Khatauni Khata No. 00482, Mauza Rampur',
      confidence: 97.8,
      box: { x: 12, y: 34, width: 75, height: 8 },
      fieldKey: 'khasraNumber',
      category: 'property'
    },
    {
      id: 'bbox-4',
      label: 'Conveyed Area Claimed',
      text: 'Area: 2.10 Acres (Equivalent to 0.849 Hectares / 8 Bigha 8 Biswa)',
      confidence: 94.2,
      box: { x: 12, y: 45, width: 76, height: 9 },
      fieldKey: 'claimedAreaAcres',
      isFlagged: true,
      mismatchReason: 'Area discrepancy: Claimed 2.10 Acres vs Official RoR 1.82 Acres (+0.28 Acre excess)',
      category: 'property'
    },
    {
      id: 'bbox-5',
      label: 'Chauhaddi / Boundaries',
      text: 'North: PWD Road | South: Plot 142/4 | East: Canal | West: Gram Sabha Land',
      confidence: 88.5,
      box: { x: 10, y: 58, width: 80, height: 12 },
      fieldKey: 'boundaries',
      isFlagged: true,
      mismatchReason: 'GIS spatial intersection shows 0.18 Acre encroachment onto PWD Road buffer',
      category: 'boundaries'
    },
    {
      id: 'bbox-6',
      label: 'Consideration & Stamp Duty',
      text: 'Valuation ₹84,50,000 | Stamp Duty Paid ₹5,91,500 at Sub-Registrar Lucknow IV',
      confidence: 98.9,
      box: { x: 10, y: 73, width: 79, height: 9 },
      fieldKey: 'considerationAmount',
      category: 'consideration'
    },
    {
      id: 'bbox-7',
      label: 'Signatures & Biometric Seal',
      text: 'Thumb Impression: Rajesh Kumar | Witness 1: Arvind Yadav | Witness 2: S.P. Tiwari',
      confidence: 91.0,
      box: { x: 12, y: 84, width: 76, height: 12 },
      fieldKey: 'signatures',
      category: 'signatures'
    }
  ],
  anomalies: [
    {
      id: 'anom-1',
      type: 'AREA_DISCREPANCY',
      title: 'Area Discrepancy Flagged',
      description: 'The submitted deed specifies 2.10 Acres, whereas the current digitized RoR (Bhulekh Khatauni #00482) records only 1.82 Acres. Potential excess conveyance of 0.28 Acres.',
      severity: 'HIGH',
      sourceDatabases: ['Bhulekh UP RoR', 'IGRS Deed Submission'],
      statutoryReference: 'Section 31 & Section 38, UP Revenue Code 2006 (Correction of Records and Map Discrepancies)',
      officerAdvisoryNote: 'Require Tehsildar/Revenue Inspector spot verification before proceeding with registration or mutation.',
      status: 'FLAGGED',
      detectedAt: '2026-02-14 10:15:22'
    },
    {
      id: 'anom-2',
      type: 'COURT_STAY_NOTICE',
      title: 'Active Civil Court Injunction Advisory',
      description: 'e-Courts integration identified pending litigation Civil Suit No. 2024/491 (Rajesh Kumar vs Rameshwar & Ors.) before Civil Judge (Sr. Div.) Lucknow with active status on alienation.',
      severity: 'CRITICAL',
      sourceDatabases: ['e-Courts National Judicial Grid', 'Lucknow District Court Registry'],
      statutoryReference: 'Section 52, Transfer of Property Act 1882 (Doctrine of Lis Pendens) & Order 39 CPC',
      officerAdvisoryNote: 'Sub-Registrar must review certified copy of court interim order to determine if alienation is barred.',
      status: 'FLAGGED',
      detectedAt: '2026-02-14 10:15:24'
    },
    {
      id: 'anom-3',
      type: 'ENCUMBRANCE_ALERT',
      title: 'Undisclosed Banking Encumbrance Alert',
      description: 'CERSAI security interest search indicates an active commercial charge of ₹35,00,000 registered by State Bank of India (Gomti Nagar Branch) without a recorded NOC / release deed.',
      severity: 'HIGH',
      sourceDatabases: ['CERSAI Central Registry', 'SLBC Uttar Pradesh'],
      statutoryReference: 'SARFAESI Act 2002 Section 26D & Section 58 Transfer of Property Act',
      officerAdvisoryNote: 'Verify bank satisfaction certificate or obtain non-encumbrance verification prior to title transfer.',
      status: 'FLAGGED',
      detectedAt: '2026-02-14 10:15:25'
    },
    {
      id: 'anom-4',
      type: 'BOUNDARY_OVERLAP',
      title: 'Spatial Cadastral Encroachment Indicator',
      description: 'BhuNaksha GIS boundary alignment shows the surveyed northern parcel polygon intersecting the PWD Road buffer strip by approximately 0.18 Acres.',
      severity: 'MEDIUM',
      sourceDatabases: ['BhuNaksha GIS UP', 'PWD Infrastructure Layer'],
      statutoryReference: 'Section 132, UP Revenue Code 2006 (Non-alienable public utility land)',
      officerAdvisoryNote: 'Forward to Kanungo / Field Patwari for demarcation (Seemankan) under Section 24.',
      status: 'FLAGGED',
      detectedAt: '2026-02-14 10:15:28'
    }
  ],
  history: {
    lastRecordedYear: '2018',
    fasliYear: '1428 Fasli',
    recordedOwners: ['Late Ramcharan (50% share)', 'Rajesh Kumar (50% share)'],
    recordedAreaAcres: 1.82,
    recordedKhasra: '142/3 (Subdivided from Parent Khasra 142)',
    boundaries: {
      north: 'PWD Village Link Road (Original boundary stone #42)',
      south: 'Khasra 142/4 (Agricultural field of Suresh Verma)',
      east: 'Chak Road & Irrigation Drainage',
      west: 'Khasra 141 (Gram Sabha Naveen Parti)'
    },
    sourceDoc: 'Khatauni Jamabandi Fasli 1425-1430, Record Room Lucknow Sadar',
    changesIdentified: [
      {
        field: 'Ownership & Shares',
        historicalVal: 'Late Ramcharan (50%) + Rajesh Kumar (50%)',
        currentVal: 'Rajesh Kumar (Claiming 100% Sole Ownership)',
        changeType: 'MODIFIED',
        advisoryNote: 'Succession (Varisatan Dakhil-Kharij) from Late Ramcharan not evidenced in certified mutation order.'
      },
      {
        field: 'Recorded Total Area',
        historicalVal: '1.82 Acres (0.736 Hectares)',
        currentVal: '2.10 Acres (0.849 Hectares)',
        changeType: 'MODIFIED',
        advisoryNote: 'Net increase of +0.28 Acres without any corresponding sub-division or land allotment order.'
      },
      {
        field: 'Northern Chauhaddi / Boundary',
        historicalVal: 'PWD Road stone marker #42 (15m setback)',
        currentVal: 'PWD Road directly abutting tarmac (Zero setback claimed)',
        changeType: 'MODIFIED',
        advisoryNote: 'Demarcation stone displacement noted; potential intrusion into PWD right-of-way.'
      },
      {
        field: 'Encumbrance / Lien Status',
        historicalVal: 'Clean / Unencumbered (2018 Record)',
        currentVal: 'Active SBI Mortgage ₹35 Lakhs (2022 CERSAI charge)',
        changeType: 'ADDED',
        advisoryNote: 'Subsequent bank lien created in 2022 not endorsed on Khatauni margin (Bhoomi Rann column).'
      }
    ]
  }
};

export const SECONDARY_RECORDS: LandRecord[] = [
  {
    id: 'REC-UP-VNS-2026-8901',
    khasraNumber: '89/1',
    khataNumber: '00119',
    village: 'Shivpur',
    tehsil: 'Pindra',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    ownerName: 'Virendra Pratap Singh',
    fatherName: 'Late Brijeshwar Singh',
    coOwners: [],
    areaAcres: 0.94,
    areaHectares: 0.380,
    landType: 'Residential',
    deedRegistrationNo: 'DEED/2026/VNS/1082',
    deedDate: '2026-01-29',
    claimedAreaAcres: 0.94,
    considerationAmount: '₹ 1,12,00,000',
    stampDutyPaid: '₹ 7,84,000',
    status: 'FLAGGED_ANOMALY',
    riskScore: 88,
    confidenceScore: 94.0,
    encumbrance: {
      hasActiveMortgage: false
    },
    litigation: {
      hasStayOrder: false
    },
    boundaries: {
      north: 'Ring Road Phase 2',
      south: 'Plot 89/2',
      east: 'Private Layout Road',
      west: 'Plot 88'
    },
    coordinates: {
      lat: 25.3855,
      lng: 82.9644
    },
    boundingBoxes: [],
    anomalies: [
      {
        id: 'anom-dup-1',
        type: 'POTENTIAL_DUPLICATE',
        title: 'Potential Duplicate Deed Registration Alert',
        description: 'AI perceptual match flagged that Khasra 89/1 was previously conveyed by Registered Sale Deed #4981 on 2025-04-12 to another buyer (M/s Kashi Infrahomes). Current submission may be an unauthorized re-conveyance.',
        severity: 'CRITICAL',
        sourceDatabases: ['IGRS Deed Repository', 'Sub-Registrar Pindra Archive'],
        statutoryReference: 'Section 48, Transfer of Property Act 1882 (Priority of Rights Created by Transfer)',
        officerAdvisoryNote: 'Hold deed registration. Check original title deed and summon parties for verification.',
        status: 'FLAGGED',
        detectedAt: '2026-01-29 14:20:00'
      }
    ],
    history: {
      lastRecordedYear: '2020',
      fasliYear: '1427 Fasli',
      recordedOwners: ['Virendra Pratap Singh'],
      recordedAreaAcres: 0.94,
      recordedKhasra: '89/1',
      boundaries: {
        north: 'Ring Road corridor',
        south: 'Plot 89/2',
        east: 'Private Road',
        west: 'Plot 88'
      },
      sourceDoc: 'Khatauni 1427-1432, Tehsil Pindra',
      changesIdentified: []
    }
  },
  {
    id: 'REC-UP-AYD-2026-2041',
    khasraNumber: '204/A',
    khataNumber: '00612',
    village: 'Darshannagar',
    tehsil: 'Sadar',
    district: 'Ayodhya',
    state: 'Uttar Pradesh',
    ownerName: 'Manish Chaurasia',
    fatherName: 'Dinanath Chaurasia',
    coOwners: ['Sunita Chaurasia (Wife)'],
    areaAcres: 0.65,
    areaHectares: 0.263,
    landType: 'Commercial',
    deedRegistrationNo: 'DEED/2026/AYD/3391',
    deedDate: '2026-02-10',
    claimedAreaAcres: 0.65,
    considerationAmount: '₹ 1,45,00,000',
    stampDutyPaid: '₹ 10,15,000',
    status: 'VERIFIED',
    riskScore: 12,
    confidenceScore: 98.7,
    encumbrance: {
      hasActiveMortgage: false
    },
    litigation: {
      hasStayOrder: false
    },
    boundaries: {
      north: 'Commercial Complex',
      south: 'National Highway 27 Service Road',
      east: 'Plot 204/B',
      west: 'Plot 203'
    },
    coordinates: {
      lat: 26.7744,
      lng: 82.1648
    },
    boundingBoxes: [],
    anomalies: [],
    history: {
      lastRecordedYear: '2023',
      fasliYear: '1430 Fasli',
      recordedOwners: ['Manish Chaurasia', 'Sunita Chaurasia'],
      recordedAreaAcres: 0.65,
      recordedKhasra: '204/A',
      boundaries: {
        north: 'Commercial Complex',
        south: 'NH-27 Service Lane',
        east: 'Plot 204/B',
        west: 'Plot 203'
      },
      sourceDoc: 'Khatauni 1430, Tehsil Sadar Ayodhya',
      changesIdentified: []
    }
  }
];

export const CADASTRAL_PARCELS: CadastralParcel[] = [
  {
    khasra: '142/1',
    owner: 'Harish Chandra',
    areaAcres: 0.95,
    status: 'CLEAN',
    polygon: [[60, 40], [180, 40], [170, 150], [60, 140]],
    center: [115, 90]
  },
  {
    khasra: '142/2',
    owner: 'Anita Devi',
    areaAcres: 1.10,
    status: 'CLEAN',
    polygon: [[180, 40], [310, 40], [300, 150], [170, 150]],
    center: [240, 95]
  },
  {
    khasra: '142/3',
    owner: 'Rajesh Kumar (Under Review)',
    areaAcres: 1.82,
    status: 'CRITICAL',
    polygon: [[310, 40], [480, 40], [470, 220], [300, 150]],
    center: [390, 120],
    encroachmentDetected: true,
    encroachmentDetails: 'Survey shows northern boundary protrusion (0.18 Acre) into the PWD arterial road buffer.',
    subDivision: 'Subdivided in 1428 Fasli'
  },
  {
    khasra: '142/4',
    owner: 'Suresh Verma',
    areaAcres: 2.30,
    status: 'WARNING',
    polygon: [[300, 150], [470, 220], [450, 360], [280, 320]],
    center: [370, 260]
  },
  {
    khasra: '141',
    owner: 'Gram Sabha Naveen Parti (Govt Pasture)',
    areaAcres: 4.80,
    status: 'GOV_LAND',
    polygon: [[480, 40], [640, 40], [630, 340], [470, 220]],
    center: [550, 180]
  },
  {
    khasra: '143',
    owner: 'Gram Sabha Pokhari / Water Body (Sec 132)',
    areaAcres: 1.45,
    status: 'GOV_LAND',
    polygon: [[60, 140], [170, 150], [160, 300], [50, 280]],
    center: [110, 220]
  },
  {
    khasra: '144',
    owner: 'Shivam Agrotech Cold Storage',
    areaAcres: 3.20,
    status: 'CLEAN',
    polygon: [[170, 150], [300, 150], [280, 320], [160, 300]],
    center: [230, 230]
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'High Discrepancy Flagged: Khasra 142/3',
    message: 'AI cross-check flagged an area mismatch (+0.28 Acre) and active civil court stay. Officer review advised.',
    time: '8 mins ago',
    type: 'ALERT',
    read: false,
    recordKhasra: '142/3'
  },
  {
    id: 'notif-2',
    title: 'e-Courts Injunction Notice Synced',
    message: 'District Court Lucknow uploaded ad-interim injunction for Civil Suit 2024/491 impacting Rampur Mauza.',
    time: '24 mins ago',
    type: 'WARNING',
    read: false,
    recordKhasra: '142/3'
  },
  {
    id: 'notif-3',
    title: 'Batch OCR Ingestion Complete',
    message: '42 historical Jamabandi records digitized from Tehsil Sadar record room with 94.8% average confidence.',
    time: '1 hour ago',
    type: 'SUCCESS',
    read: true
  },
  {
    id: 'notif-4',
    title: 'Field Patwari Inspection Scheduled',
    message: 'Revenue Inspector P.K. Mishra assigned for physical boundary demarcation of Khasra 142/3 Rampur.',
    time: '2 hours ago',
    type: 'INFO',
    read: true,
    recordKhasra: '142/3'
  }
];

export const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'aud-001',
    timestamp: '2026-02-14 10:14:02 IST',
    operatorName: 'Sunil Sharma (DEO-409)',
    operatorRole: 'Data Entry Operator',
    action: 'Document Ingestion & Bilateral Scan Filter',
    khasraNumber: '142/3',
    details: 'Scanned Sale Deed (14 pages, 600 DPI) uploaded. Auto-deskew applied (1.2° correction).',
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    verificationBadge: 'SHA-256 Validated'
  },
  {
    id: 'aud-002',
    timestamp: '2026-02-14 10:15:22 IST',
    operatorName: 'LandSure Indic-OCR Engine v3.2',
    operatorRole: 'Automated AI Pipeline',
    action: 'Multi-lingual OCR & Entity Extraction',
    khasraNumber: '142/3',
    details: '7 primary bounding boxes generated with 92.4% composite confidence. 4 anomalies flagged.',
    sha256Hash: 'a8f5f167f44f4964e6c998dee827110c0175b9f7a796e625d97f2619cd8e4ff8',
    verificationBadge: 'Digital Seal Stamp'
  },
  {
    id: 'aud-003',
    timestamp: '2026-02-14 10:15:25 IST',
    operatorName: 'Registry Reconciliation Daemon',
    operatorRole: 'Cross-Verification Bus',
    action: 'CERSAI & e-Courts Database Check',
    khasraNumber: '142/3',
    details: 'Active mortgage reference CERSAI-LKO-2022-094812 retrieved. Civil Suit 2024/491 matched.',
    sha256Hash: '6dcd4ce23d88e2ee9568ba546c007c63d9131c1b',
    verificationBadge: 'API Bridge Verified'
  },
  {
    id: 'aud-004',
    timestamp: '2026-02-14 11:30:10 IST',
    operatorName: 'Rajeev Srivastava',
    operatorRole: 'Revenue Officer (Sub-Registrar Persona)',
    action: 'Field Correction & Officer Triage',
    khasraNumber: '142/3',
    details: 'Flagged discrepancy for Tehsildar spot inquiry; statutory notice generated under Section 34.',
    sha256Hash: 'b45c2f3e8912d091e7724183ab301b447601f2',
    verificationBadge: 'e-Sign Qualified'
  }
];

