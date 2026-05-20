import React from 'react';
import { RefreshCw, Calendar, Download } from 'lucide-react';
export default function DashboardHeader({ onRefresh }: any) {
  return (
    
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1
          className="text-2xl font-semibold tracking-tight"
          style={{ color: 'hsl(var(--text-primary))' }}
        >
          Knowledge Dashboard
        </h1>
        <p
          className="text-sm mt-0.5"
          style={{ color: 'hsl(var(--text-muted))' }}
        >
          Your second brain — last synced 4 minutes ago
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* Date Button */}
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-150"
          style={{
            backgroundColor: 'hsl(var(--surface))',
            borderColor: 'hsl(var(--border))',
            color: 'hsl(var(--text-secondary))',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor =
              'hsl(var(--primary-light))';
            (e.currentTarget as HTMLElement).style.color =
              'hsl(var(--text-primary))';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor =
              'hsl(var(--border))';
            (e.currentTarget as HTMLElement).style.color =
              'hsl(var(--text-secondary))';
          }}
        >
          <Calendar size={14} />
          Last 30 days
        </button>
        {/* 🔥 FIXED REFRESH BUTTON */}
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-150"
          style={{
            backgroundColor: 'hsl(var(--surface))',
            borderColor: 'hsl(var(--border))',
            color: 'hsl(var(--text-secondary))',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor =
              'hsl(var(--surface-elevated))';
            (e.currentTarget as HTMLElement).style.color =
              'hsl(var(--text-primary))';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor =
              'hsl(var(--surface))';
            (e.currentTarget as HTMLElement).style.color =
              'hsl(var(--text-secondary))';
          }}
        >
          <RefreshCw size={14} />
          Refresh
        </button>

        {/* Export Button */}
        
      </div>
    </div>
  );
}