import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, ShieldAlert } from 'lucide-react';

export const StatutoryDisclaimerBanner: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="bg-amber-50/90 border-b border-amber-200 text-amber-950 px-4 py-2 text-xs transition-all">
      <div className="max-w-7xl mx-auto flex items-start justify-between gap-3">
        <div className="flex items-start space-x-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-wider text-[10px] bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded border border-amber-300">
                Statutory Advisory Notice
              </span>
              <span className="font-semibold text-amber-900">
                AI Decision-Support System for Administrative Verification
              </span>
            </div>
            {!collapsed ? (
              <p className="mt-1 text-[11px] text-amber-800 leading-relaxed">
                LandSure AI provides automated document OCR, spatial polygon alignment, and cross-database screening to highlight potential anomalies (e.g. area discrepancies, ownership mismatches, duplicate entries). All extracted values and identified regulatory references are <strong className="font-semibold text-amber-950">advisory observations</strong> intended to assist revenue officers. <em>Final statutory title determination and registration approval rest solely with the competent Revenue Authority / Sub-Registrar under the Uttar Pradesh Revenue Code, 2006 and the Registration Act, 1908.</em>
              </p>
            ) : (
              <p className="mt-0.5 text-[11px] text-amber-800 italic">
                AI outputs are advisory. Statutory determination rests with competent Revenue Officers. Click expand for full notice.
              </p>
            )}
          </div>
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-amber-800 hover:text-amber-950 p-1 rounded hover:bg-amber-100 shrink-0"
          title={collapsed ? 'Expand Notice' : 'Collapse Notice'}
        >
          {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

