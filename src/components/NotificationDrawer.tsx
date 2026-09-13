import React from 'react';
import { useApp } from '../context/AppContext';
import { X, AlertCircle, Info, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

export const NotificationDrawer: React.FC = () => {
  const {
    notifications,
    isNotifDrawerOpen,
    setIsNotifDrawerOpen,
    markNotificationAsRead,
    setCurrentScreen,
    quickNavigateToRecord
  } = useApp();

  if (!isNotifDrawerOpen) return null;

  const handleAction = (khasra?: string) => {
    if (khasra) {
      quickNavigateToRecord(khasra);
      setCurrentScreen('CROSS_VERIFICATION');
    }
    setIsNotifDrawerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Header */}
        <div className="px-4 py-3 bg-[#0b192c] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm tracking-wide">Registry Notifications & Alerts</h3>
          </div>
          <button
            onClick={() => setIsNotifDrawerOpen(false)}
            className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No active notifications
            </div>
          ) : (
            notifications.map(item => {
              const icon =
                item.type === 'ALERT' ? (
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                ) : item.type === 'WARNING' ? (
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                ) : item.type === 'SUCCESS' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Info className="w-5 h-5 text-blue-600 shrink-0" />
                );

              const borderColor =
                item.type === 'ALERT'
                  ? 'border-red-200 bg-red-50/50'
                  : item.type === 'WARNING'
                  ? 'border-amber-200 bg-amber-50/50'
                  : item.type === 'SUCCESS'
                  ? 'border-emerald-200 bg-emerald-50/50'
                  : 'border-blue-200 bg-blue-50/50';

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-lg border ${borderColor} text-xs transition ${
                    !item.read ? 'ring-1 ring-blue-400/50' : 'opacity-85'
                  }`}
                  onClick={() => markNotificationAsRead(item.id)}
                >
                  <div className="flex items-start gap-2.5">
                    {icon}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900">{item.title}</span>
                        <span className="text-[10px] text-slate-400">{item.time}</span>
                      </div>
                      <p className="mt-1 text-slate-600 leading-relaxed">{item.message}</p>
                      {item.recordKhasra && (
                        <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-200/60">
                          <span className="text-[10px] font-mono font-semibold text-slate-700 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                            Khasra: {item.recordKhasra}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction(item.recordKhasra);
                            }}
                            className="inline-flex items-center space-x-1 text-blue-700 hover:text-blue-900 font-semibold text-[11px]"
                          >
                            <span>Inspect Record</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500">
          LandSure AI Central Notification Stream &bull; State Land Records Bus
        </div>
      </div>
    </div>
  );
};

