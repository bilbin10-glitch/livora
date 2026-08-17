import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className="toast-container">
      <div className={`toast-box ${type}`}>
        {type === 'success' && <CheckCircle size={18} color="var(--brand-success)" />}
        {type === 'error' && <AlertCircle size={18} color="var(--brand-primary)" />}
        {type === 'info' && <Info size={18} color="var(--brand-cyan)" />}
        <span>{message}</span>
        <button onClick={onClose} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }}>
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
