import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  AlertTriangle,
  CheckCircle,
  Eye,
  Compass,
  FileText,
  Shield,
  ArrowRight,
  Info
} from 'lucide-react';

export const GisExplorerScreen: React.FC = () => {
  const {
    parcels,
    selectedParcelKhasra,
    setSelectedParcelKhasra,
    setCurrentScreen,
    quickNavigateToRecord
  } = useApp();

  const [showSatellite, setShowSatellite] = useState(false);
  const [showEncroachment, setShowEncroachment] = useState(true);
  const [showGovLand, setShowGovLand] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);

  const activeParcel = parcels.find(p => p.khasra === selectedParcelKhasra) || parcels[2];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
              BhuNaksha Spatial Verification GIS
            </span>
            <span className="text-xs text-slate-500">
              Village: <strong className="text-slate-800">Rampur (Mauza #190)</strong> &bull; Tehsil: <strong className="text-slate-800">Sarojini Nagar</strong>, Lucknow
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 mt-1">
            Cadastral Parcel Map & Boundary Alignment Engine
          </h1>
          <p className="text-xs text-slate-500">
            Interactive cadastral survey grid overlaying revenue boundaries, road setback buffers, and Gram Sabha protected tracts.
          </p>
        </div>

        {/* Quick Layer Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowSatellite(!showSatellite)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              showSatellite
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            Satellite View: {showSatellite ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={() => setShowEncroachment(!showEncroachment)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              showEncroachment
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            Road Buffers: {showEncroachment ? 'Visible' : 'Hidden'}
          </button>
        </div>
      </div>

      {/* Main Grid: GIS Map Canvas (8 cols) + Parcel Detail Panel (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive SVG Cadastral Map (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 p-4 shadow-lg flex flex-col relative overflow-hidden">
          {/* Map Top Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-white text-xs z-10">
            <div className="flex items-center space-x-2">
              <Compass className="w-4 h-4 text-emerald-400 animate-spin-slow" />
              <span className="font-bold tracking-wide">
                Village Rampur Cadastral Survey Sheet 04 &bull; Scale 1:4000
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.6))}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.8))}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                title="Reset View"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Cadastral Map Viewport */}
          <div className="relative w-full h-[520px] bg-[#1e293b] rounded-xl overflow-hidden mt-3 select-none flex items-center justify-center">
            {/* Background Texture / Satellite View Simulation */}
            {showSatellite ? (
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 transition-opacity"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 50% 50%, #15803d 0%, #064e3b 50%, #022c22 100%)',
                  filter: 'contrast(120%) brightness(90%)'
                }}
              ></div>
            ) : (
              <div className="absolute inset-0 bg-[#0f172a] bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-70"></div>
            )}

            {/* PWD Village Arterial Road Buffer Strip (Top) */}
            <div className="absolute top-2 left-6 right-6 h-10 bg-slate-700/80 border-y-2 border-dashed border-amber-400 flex items-center justify-center text-[10px] text-amber-200 font-mono tracking-widest uppercase z-10">
              PWD Village Link Road (Km 4/2) &bull; 15 Meter Statutory Setback Buffer
            </div>

            {/* Minor Irrigation Canal (Right Strip) */}
            <div className="absolute top-16 bottom-6 right-3 w-8 bg-blue-600/40 border-x border-blue-400 flex items-center justify-center [writing-mode:vertical-rl] text-[9px] text-blue-200 font-mono tracking-wider">
              Minor Irrigation Canal (Chak Road)
            </div>

            {/* SVG Cadastral Polygons */}
            <svg
              viewBox="0 0 700 420"
              className="w-full h-full transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <defs>
                {/* Stripe pattern for encroachment */}
                <pattern
                  id="encroachment-pattern"
                  width="8"
                  height="8"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(45)"
                >
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#ef4444" strokeWidth="3" />
                </pattern>
              </defs>

              {/* Render Cadastral Parcels */}
              {parcels.map(parcel => {
                const isSelected = selectedParcelKhasra === parcel.khasra;
                const isGov = parcel.status === 'GOV_LAND';
                const isCritical = parcel.status === 'CRITICAL';
                const isWarning = parcel.status === 'WARNING';

                let fill = '#1e3a8a25';
                let stroke = '#38bdf8';

                if (isGov) {
                  fill = '#065f4635';
                  stroke = '#10b981';
                } else if (isCritical) {
                  fill = '#b91c1c30';
                  stroke = '#f87171';
                } else if (isWarning) {
                  fill = '#b4530930';
                  stroke = '#f59e0b';
                }

                if (isSelected) {
                  fill = isCritical ? '#ef444450' : '#3b82f650';
                  stroke = '#ffffff';
                }

                const pointsStr = parcel.polygon.map(pt => pt.join(',')).join(' ');

                return (
                  <g
                    key={parcel.khasra}
                    onClick={() => setSelectedParcelKhasra(parcel.khasra)}
                    className="cursor-pointer group transition"
                  >
                    <polygon
                      points={pointsStr}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={isSelected ? 3.5 : 1.8}
                      className="transition-all group-hover:opacity-90"
                    />

                    {/* Parcel Center Text */}
                    <text
                      x={parcel.center[0]}
                      y={parcel.center[1] - 4}
                      fill="#ffffff"
                      fontSize="12"
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="middle"
                      className="pointer-events-none drop-shadow-md"
                    >
                      {parcel.khasra}
                    </text>
                    <text
                      x={parcel.center[0]}
                      y={parcel.center[1] + 12}
                      fill="#cbd5e1"
                      fontSize="9"
                      textAnchor="middle"
                      className="pointer-events-none"
                    >
                      {parcel.areaAcres} Acres
                    </text>
                  </g>
                );
              })}

              {/* Encroachment Overlap Highlight on Khasra 142/3 */}
              {showEncroachment && (
                <g className="pointer-events-none">
                  {/* Road Overlap Strip: polygon intersecting northern boundary */}
                  <polygon
                    points="310,40 480,40 475,65 315,65"
                    fill="url(#encroachment-pattern)"
                    stroke="#ef4444"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="330"
                    y="45"
                    width="130"
                    height="16"
                    rx="3"
                    fill="#991b1b"
                    opacity="0.9"
                  />
                  <text
                    x="395"
                    y="57"
                    fill="#ffffff"
                    fontSize="8.5"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    Encroachment Strip: 0.18 Acre
                  </text>
                </g>
              )}
            </svg>

            {/* Map Legend (Bottom-Left) */}
            <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-700 backdrop-blur-xs p-2.5 rounded-lg text-[10px] text-slate-300 space-y-1 z-10">
              <div className="font-bold text-slate-100 uppercase pb-0.5 border-b border-slate-700">
                Map Legend
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-red-500/80 border border-red-400"></span>
                <span>Flagged Parcel (Khasra 142/3)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600/80 border border-emerald-400"></span>
                <span>Gram Sabha / Public Water Body</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-amber-500/80 border border-amber-400"></span>
                <span>Demarcation Caution</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Selected Parcel Inspector Card (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 space-y-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Inspected Parcel
              </span>
              <h3 className="font-extrabold text-lg text-slate-900 font-mono">
                Khasra {activeParcel.khasra}
              </h3>
            </div>
            <span
              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                activeParcel.status === 'CRITICAL'
                  ? 'bg-red-100 text-red-800'
                  : activeParcel.status === 'GOV_LAND'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {activeParcel.status.replace('_', ' ')}
            </span>
          </div>

          {/* Parcel Primary Details */}
          <div className="space-y-2.5 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Recorded Tenure Holder</span>
              <span className="font-bold text-slate-800 text-sm">{activeParcel.owner}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Surveyed Area</span>
                <span className="font-mono font-bold text-slate-900">{activeParcel.areaAcres} Acres</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Metric Equiv.</span>
                <span className="font-mono font-bold text-slate-900">
                  {(activeParcel.areaAcres * 0.4046).toFixed(3)} Hectares
                </span>
              </div>
            </div>

            {/* GPS Geo-Anchor Coordinates */}
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">GPS Geo-Anchor</span>
              <span className="font-mono text-slate-700 text-[11px]">
                26.7489° N, 80.8924° E &bull; UTM Zone 44N
              </span>
            </div>

            {/* Encroachment Alert Box if Present */}
            {activeParcel.encroachmentDetected && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 space-y-1.5 text-red-900">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Cadastral Encroachment Indicator</span>
                </div>
                <p className="text-[11px] text-red-800 leading-relaxed">
                  {activeParcel.encroachmentDetails}
                </p>
                <div className="pt-1 text-[10px] font-semibold text-red-950">
                  Statutory Reference for Review: Section 132 & Section 24, UP Revenue Code, 2006.
                </div>
              </div>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            {activeParcel.khasra === '142/3' && (
              <button
                onClick={() => {
                  quickNavigateToRecord('142/3');
                  setCurrentScreen('DOC_VERIFICATION');
                }}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs py-2.5 rounded-lg shadow-xs transition flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Open Document Verification Workspace</span>
              </button>
            )}

            <button
              onClick={() => {
                quickNavigateToRecord(activeParcel.khasra);
                setCurrentScreen('RECORD_COMPARISON');
              }}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-semibold text-xs py-2.5 rounded-lg transition flex items-center justify-center gap-1.5"
            >
              <span>View Historical Boundary Comparison</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

