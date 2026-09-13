import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
  Printer,
  FileCheck,
  Building2,
  QrCode,
  ArrowRight,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';

export const CitizenPortalScreen: React.FC = () => {
  const { currentRecord, quickNavigateToRecord, records } = useApp();

  const [district, setDistrict] = useState('Lucknow');
  const [tehsil, setTehsil] = useState('Sarojini Nagar');
  const [village, setVillage] = useState('Rampur');
  const [khasraInput, setKhasraInput] = useState('142/3');
  const [searched, setSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    quickNavigateToRecord(khasraInput.trim());
    setSearched(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const isHighRisk = currentRecord.riskScore >= 70;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Citizen Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2 no-print">
        <div className="inline-flex items-center space-x-1.5 bg-emerald-100 text-emerald-900 text-xs px-3 py-1 rounded-full font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Citizen Land Title Verification Portal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          "Verify Before You Buy"
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Protect yourself from land fraud, undisclosed bank mortgages, and illegal encroachments before giving any token money.
        </p>
      </div>

      {/* Citizen Search Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs no-print">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                District / ज़िला
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white font-medium focus:ring-2 focus:ring-blue-500"
              >
                <option value="Lucknow">Lucknow (लखनऊ)</option>
                <option value="Varanasi">Varanasi (वाराणसी)</option>
                <option value="Ayodhya">Ayodhya (अयोध्या)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Tehsil / तहसील
              </label>
              <select
                value={tehsil}
                onChange={(e) => setTehsil(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white font-medium focus:ring-2 focus:ring-blue-500"
              >
                <option value="Sarojini Nagar">Sarojini Nagar (सरोजिनी नगर)</option>
                <option value="Pindra">Pindra (पिंडरा)</option>
                <option value="Sadar">Sadar (सदर)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Village / Mauza (गाँव)
              </label>
              <select
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white font-medium focus:ring-2 focus:ring-blue-500"
              >
                <option value="Rampur">Rampur (रामपुर)</option>
                <option value="Shivpur">Shivpur (शिवपुर)</option>
                <option value="Darshannagar">Darshannagar (दर्शननगर)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Khasra / खसरा संख्या
              </label>
              <input
                type="text"
                value={khasraInput}
                onChange={(e) => setKhasraInput(e.target.value)}
                placeholder="e.g. 142/3"
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg font-mono font-bold focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <span>Quick test parcels:</span>
              <button
                type="button"
                onClick={() => {
                  setKhasraInput('142/3');
                  quickNavigateToRecord('142/3');
                }}
                className="font-mono text-blue-700 hover:underline font-bold"
              >
                142/3 (Caution)
              </button>
              <span>&bull;</span>
              <button
                type="button"
                onClick={() => {
                  setKhasraInput('204/A');
                  quickNavigateToRecord('204/A');
                }}
                className="font-mono text-emerald-700 hover:underline font-bold"
              >
                204/A (Clean)
              </button>
            </div>

            <button
              type="submit"
              className="inline-flex items-center space-x-2 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-xs transition"
            >
              <Search className="w-4 h-4" />
              <span>Generate Title Health Certificate</span>
            </button>
          </div>
        </form>
      </div>

      {/* Official Land Health Certificate View */}
      {searched && (
        <div id="printable-certificate" className="bg-white rounded-2xl border-2 border-slate-300 p-6 sm:p-8 space-y-6 shadow-md">
          {/* Certificate Gov Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b-2 border-slate-200 gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-xl bg-[#0b192c] text-white flex items-center justify-center font-bold shadow-md">
                <Building2 className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                  Revenue Council &bull; Government of Uttar Pradesh
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Land Health & Title Clearance Certificate
                </h2>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  Verification Token: <strong className="text-slate-800 font-mono">LS-LKO-{currentRecord.khasraNumber.replace('/', '-')}-2026</strong>
                </div>
              </div>
            </div>

            {/* Print Button (hidden on print) */}
            <div className="no-print">
              <button
                onClick={handlePrint}
                className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xs transition"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Download Certificate</span>
              </button>
            </div>
          </div>

          {/* Citizen Clear Verdict Banner */}
          <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${
            isHighRisk
              ? 'bg-red-50 border-red-200 text-red-950'
              : 'bg-emerald-50 border-emerald-200 text-emerald-950'
          }`}>
            <div className={`p-2 rounded-lg text-white ${isHighRisk ? 'bg-red-700' : 'bg-emerald-700'}`}>
              {isHighRisk ? <ShieldAlert className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider">
                Title Clearance Advisory:
              </div>
              <h3 className="text-lg font-black mt-0.5">
                {isHighRisk ? 'CAUTION: Encumbered & Disputed Land Title' : 'CLEAR: Title Concordance Clean & Unencumbered'}
              </h3>
              <p className="text-xs mt-1 leading-relaxed">
                {isHighRisk
                  ? 'Active risk indicators detected. We strongly advise prospective buyers NOT to pay advance token amounts until statutory clearances are issued by the revenue court.'
                  : 'Official RoR, CERSAI mortgage check, and judicial grids confirm no adverse liens, active stays, or area discrepancies on this parcel.'}
              </p>
            </div>
          </div>

          {/* Land Parcel Summary Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Khasra Number</span>
              <span className="font-bold text-slate-900 font-mono text-base">{currentRecord.khasraNumber}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Recorded Owner</span>
              <span className="font-bold text-slate-900 text-sm">{currentRecord.ownerName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Official RoR Area</span>
              <span className="font-bold text-slate-900 text-sm">{currentRecord.areaAcres} Acres</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Location</span>
              <span className="font-bold text-slate-900 text-sm">{currentRecord.village}, {currentRecord.district}</span>
            </div>
          </div>

          {/* Plain-Language Citizen Checklist */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
              Key Pre-Purchase Checklist For Citizens
            </h4>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
              {/* Check 1: Bank Mortgage */}
              <div className="p-3.5 flex items-start gap-3 bg-white">
                <div className="mt-0.5">
                  {currentRecord.encumbrance.hasActiveMortgage ? (
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900">
                    Is there an active Bank Mortgage or Security Charge?
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    {currentRecord.encumbrance.hasActiveMortgage
                      ? `YES (WARNING): Active charge of ${currentRecord.encumbrance.amount} registered by ${currentRecord.encumbrance.bankName}. Demand a registered Deed of Redemption / Bank NOC.`
                      : 'NO: No registered financial encumbrance found in CERSAI database.'}
                  </p>
                </div>
              </div>

              {/* Check 2: Court Stay */}
              <div className="p-3.5 flex items-start gap-3 bg-white">
                <div className="mt-0.5">
                  {currentRecord.litigation.hasStayOrder ? (
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900">
                    Is there any pending Civil Court Injunction or Stay Order?
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    {currentRecord.litigation.hasStayOrder
                      ? `YES (WARNING): ${currentRecord.litigation.courtName} has issued an injunction against transfer under ${currentRecord.litigation.caseNumber}.`
                      : 'NO: No active stay orders flagged in the e-Courts National Judicial Grid.'}
                  </p>
                </div>
              </div>

              {/* Check 3: Area Match */}
              <div className="p-3.5 flex items-start gap-3 bg-white">
                <div className="mt-0.5">
                  {currentRecord.claimedAreaAcres !== currentRecord.areaAcres ? (
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900">
                    Does the claimed plot size match the government revenue record?
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    {currentRecord.claimedAreaAcres !== currentRecord.areaAcres
                      ? `MISMATCH: The seller claims ${currentRecord.claimedAreaAcres} Acres, but official Bhulekh Khatauni records only ${currentRecord.areaAcres} Acres (+${(currentRecord.claimedAreaAcres - currentRecord.areaAcres).toFixed(2)} Acre excess).`
                      : `MATCHED: The area strictly matches official Bhulekh records (${currentRecord.areaAcres} Acres).`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Verification Seal & QR Simulation */}
          <div className="pt-4 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center space-x-3">
              <div className="p-2 border border-slate-300 rounded-lg bg-slate-50">
                <QrCode className="w-12 h-12 text-slate-800" />
              </div>
              <div className="text-[10px] text-slate-500">
                <div>Scan QR to verify live status on UP Bhulekh Registry</div>
                <div className="font-mono text-slate-700">Digital Hash: 8f92a10b48...</div>
                <div className="text-slate-400">Generated on: {new Date().toLocaleDateString('en-IN')}</div>
              </div>
            </div>

            <div className="text-right text-[10px] text-slate-400">
              <div className="font-bold uppercase text-slate-700">LandSure AI Citizen Advisory Grid</div>
              <div>Smart India Hackathon 2026 Initiative &bull; Non-Statutory Advisory</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

