import { Heart } from 'lucide-react';
import { AnimatedIntegrationIcon } from './AnimatedIcons';

function DocsIconBox() {
  return (
    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E8F0FE' }}>
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <rect x="4" y="2" width="16" height="20" rx="2" fill="#4285F4"/>
        <rect x="7" y="8" width="10" height="1.5" rx="0.75" fill="white"/>
        <rect x="7" y="11" width="10" height="1.5" rx="0.75" fill="white"/>
        <rect x="7" y="14" width="7" height="1.5" rx="0.75" fill="white"/>
      </svg>
    </div>
  );
}

function SheetsIconBox() {
  return (
    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E6F4EA' }}>
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <rect x="3" y="2" width="18" height="20" rx="2" fill="#0F9D58"/>
        <line x1="3" y1="8" x2="21" y2="8" stroke="white" strokeWidth="1"/>
        <line x1="3" y1="14" x2="21" y2="14" stroke="white" strokeWidth="1"/>
        <line x1="11" y1="2" x2="11" y2="22" stroke="white" strokeWidth="1"/>
      </svg>
    </div>
  );
}

function DriveIconBox() {
  return (
    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FEF8E7' }}>
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M2.5 17.5 L8 7 L11 12.5 L5.5 17.5 Z" fill="#4285F4"/>
        <path d="M11 12.5 L14 7 L21.5 17.5 H14.5 Z" fill="#34A853"/>
        <path d="M8 7 L12 2 L16 7 Z" fill="#FBBC04"/>
      </svg>
    </div>
  );
}

const ICON_BOXES = { gdocs: DocsIconBox, gsheets: SheetsIconBox, gdrive: DriveIconBox };
const LABELS = { gdocs: 'Google Docs', gsheets: 'Google Sheets', gdrive: 'Google Drive' };

export default function IntegrationWidget({ integrations, onToggle }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-stone-800" style={{ fontFamily: 'var(--font-display)', fontSize: '18px' }}>
          Connect
        </h3>
        {/* Heart icon — subtle, non-animated (decorative) */}
        <Heart size={16} className="text-rose-300" strokeWidth={1.5} />
      </div>

      <div className="flex justify-around gap-2">
        {integrations.map(integ => {
          const IconBox = ICON_BOXES[integ.id];
          return (
            <div key={integ.id} className="flex flex-col items-center gap-1.5">
              {/* AnimatedIntegrationIcon — scale + grayscale on connect/disconnect */}
              <AnimatedIntegrationIcon
                connected={integ.connected}
                onClick={() => onToggle(integ.id)}
                label={integ.connected ? `Disconnect ${LABELS[integ.id]}` : `Connect ${LABELS[integ.id]}`}
              >
                <IconBox />
              </AnimatedIntegrationIcon>

              <p className="text-[9px] text-stone-500 font-medium text-center leading-tight max-w-[52px]">
                {LABELS[integ.id]}
              </p>
              <div className="flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${integ.connected ? 'bg-emerald-400' : 'bg-stone-300'}`} />
                <span className={`text-[9px] font-semibold ${integ.connected ? 'text-emerald-500' : 'text-stone-400'}`}>
                  {integ.connected ? 'Connected' : 'Connect'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
